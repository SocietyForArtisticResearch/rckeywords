module Main exposing (..)

import Browser
import Dict exposing (Dict)
import Graph
import Html exposing (Html, a, span)
import Html.Attributes as Attr
import Html.Events as Events
import Http
import Json.Decode exposing (Decoder, field, int, maybe, string)
import Json.Decode.Extra as JDE
import KeywordGraph


main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


subscriptions : Model -> Sub Msg
subscriptions m =
    case m of 
        Waiting -> Sub.none

        Ready model ->
            Sub.map KeywordGraphMsg (KeywordGraph.subscriptions model.keywordGraph)
    


type Model
    = Waiting
    | Ready
        { research : List Research
        , keywordSet : KeywordSet
        , query : String
        , keywordGraph : KeywordGraph.Model
        }


type Display
    = Show
    | Hide


type Msg
    = GotResearch (Result Http.Error (List Research))
    | ChangedQuery String
    | ClickedKeyword String
    | KeywordGraphMsg KeywordGraph.Msg


init : () -> ( Model, Cmd Msg )
init _ =
    ( Waiting
    , Http.get { url = "research.json", expect = Http.expectJson GotResearch decodeResearch }
    )


keywords : List Research -> KeywordSet
keywords researchlist =
    List.foldr
        (\research acc ->
            List.foldr (insert research) acc research.keywords
        )
        emptyKeywordSet
        researchlist


getKeywordId : Keyword -> Id
getKeywordId (Keyword { id }) =
    id



--getKeywordByInt : Int -> Keyword


onlyTheJusts : List (Maybe a) -> List a
onlyTheJusts listOfM =
    List.foldr
        (\mx acc ->
            case mx of
                Just x ->
                    x :: acc

                Nothing ->
                    acc
        )
        []
        listOfM


fetchReferencesIds : KeywordSet -> Keyword -> List Id
fetchReferencesIds kwSet (Keyword { refs }) =
    refs
        |> List.concatMap
            (\research ->
                research.keywords
                    |> List.map
                        (\str ->
                            lookupString str kwSet |> Maybe.map getId
                        )
                    |> onlyTheJusts
            )


toInt : Id -> Int
toInt (Id id) =
    id


edgesFromKeyword : KeywordSet -> Keyword -> List ( Int, Int )
edgesFromKeyword kwSet (Keyword k) =
    let
        fromId =
            toInt k.id

        toIds =
            Keyword k |> fetchReferencesIds kwSet |> List.map toInt
    in
    toIds |> List.map (\toId -> ( fromId, toId ))


graph : KeywordSet -> Graph.Graph String ()
graph set =
    let
        lst =
            set |> toList

        labels =
            lst |> List.map (\(Keyword k) -> k.name)

        edges =
            lst |> List.concatMap (edgesFromKeyword set)
    in
    Graph.fromNodeLabelsAndEdgePairs labels edges


type Id
    = Id Int


type Keyword
    = Keyword { refs : List Research, name : String, display : Display, id : Id }


getId (Keyword { id }) =
    id


type KeywordSet
    = KeywordSet
        { dict : Dict String Keyword
        , currentId : Id
        }


toList : KeywordSet -> List Keyword
toList (KeywordSet { dict }) =
    Dict.toList dict |> List.map (\( _, keyword ) -> keyword)


lookupString : String -> KeywordSet -> Maybe Keyword
lookupString str (KeywordSet { dict }) =
    Dict.get str dict


filter : String -> List Keyword -> List Keyword
filter query lst =
    lst |> List.filter (\(Keyword kw) -> String.contains (query |> String.toLower) (kw.name |> String.toLower))


toggle : Keyword -> Keyword
toggle (Keyword k) =
    Keyword
        { k
            | display =
                case k.display of
                    Show ->
                        Hide

                    Hide ->
                        Show
        }


showInSet : String -> KeywordSet -> KeywordSet
showInSet key (KeywordSet set) =
    KeywordSet { set | dict = Dict.update key (Maybe.map toggle) set.dict }


emptyKeywordSet =
    KeywordSet { currentId = Id 0, dict = Dict.empty }


use : Research -> Keyword -> Keyword
use research (Keyword kw) =
    Keyword { kw | refs = research :: kw.refs }


newKey : Int -> String -> Keyword
newKey id str =
    Keyword { refs = [], name = str, display = Hide, id = Id id }


insert : Research -> String -> KeywordSet -> KeywordSet
insert research k (KeywordSet { dict, currentId }) =
    let
        result =
            Dict.get k dict
    in
    case result of
        Just (Keyword kw) ->
            KeywordSet { dict = Dict.insert kw.name (use research (Keyword kw)) dict, currentId = currentId }

        Nothing ->
            let
                newId =
                    case currentId of
                        Id id ->
                            Id (id + 1)
            in
            KeywordSet { dict = Dict.insert k (newKey (currentId |> toInt) k) dict, currentId = newId }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotResearch result ->
            case result of
                Ok lst ->
                    let
                        set =
                            lst |> keywords

                        ( graphModel, cmd ) =
                            KeywordGraph.init (graph set)
                    in
                    ( Ready
                        { query = ""
                        , keywordGraph = graphModel
                        , research = lst
                        , keywordSet = set
                        }
                    , Cmd.map KeywordGraphMsg cmd
                    )

                Err err ->
                    let
                        _ =
                            Debug.log "whoops, error: " err
                    in
                    ( Waiting, Cmd.none )

        ChangedQuery q ->
            case model of
                Waiting ->
                    ( Waiting, Cmd.none )

                Ready m ->
                    ( Ready { m | query = q }, Cmd.none )

        ClickedKeyword k ->
            case model of
                Waiting ->
                    ( Waiting, Cmd.none )

                Ready m ->
                    let
                        newKeywords =
                            m.keywordSet |> showInSet k
                    in
                    ( Ready { m | keywordSet = newKeywords }, Cmd.none )

        KeywordGraphMsg kmsg ->
            case model of
                Waiting ->
                    ( Waiting, Cmd.none )

                Ready m ->
                    let
                        ( kmodel, kcmd ) =
                            KeywordGraph.update kmsg m.keywordGraph
                    in
                    ( Ready { m | keywordGraph = kmodel }, Cmd.map KeywordGraphMsg kcmd )


inlineStyle =
    [ Attr.style "display" "inline-block"
    , Attr.style "padding" "1em"
    ]


view : Model -> Html Msg
view m =
    case m of
        Waiting ->
            Html.p [] [ Html.text "waiting" ]

        Ready model ->
            let
                researchLst =
                    model.research

                viewTitle r =
                    Html.p [] [ Html.text r.title ]

                viewKeyword (Keyword kw) =
                    let
                        count =
                            List.length kw.refs

                        pixels =
                            case kw.display of
                                Hide ->
                                    if count > 12 then
                                        20

                                    else
                                        12 + count

                                Show ->
                                    40

                        refs =
                            kw.refs |> List.foldr (\r acc -> r.keywords ++ acc) []

                        viewedRefs =
                            case kw.display of
                                Hide ->
                                    []

                                Show ->
                                    [ Html.p [] <| List.map (\ref -> span (inlineStyle ++ [ Events.onClick <| ClickedKeyword ref ]) [ Html.text ref ]) refs ]
                    in
                    Html.span
                        [ Attr.style "font-size" ((pixels |> String.fromInt) ++ "px")
                        ]
                        ([ Html.span
                            (Attr.href (searchLink kw.name) :: inlineStyle)
                            [ Html.text kw.name ]
                         , Html.span []
                            [ Html.text <| (kw.refs |> List.length |> String.fromInt)
                            ]
                         , Html.input
                            [ Attr.type_ "checkbox"
                            , Attr.checked (kw.display == Show)
                            , Events.onClick (ClickedKeyword kw.name)
                            ]
                            []
                         ]
                            ++ viewedRefs
                        )

                keywordLst =
                    model.keywordSet |> toList |> filter model.query

                keywordCount =
                    "there are: " ++ (List.length keywordLst |> String.fromInt) ++ " keywords."
            in
            Html.div
                [ Attr.style "font-family" "monospace"
                ]
                [ Html.map KeywordGraphMsg (KeywordGraph.view model.keywordGraph)
                , Html.p [] [ Html.text "This was generated on February 2nd, 2022." ]
                , Html.div []
                    [ Html.h1 [] [ Html.text "Keywords" ]
                    , Html.p [] [ Html.text keywordCount ]
                    , Html.input [ Attr.placeholder "Search for keyword", Attr.value model.query, Events.onInput ChangedQuery ] []
                    , Html.p [] (List.map viewKeyword keywordLst)
                    ]

                -- , Html.div []
                --     [ Html.h1 [] [ Html.text "titles" ]
                --     , Html.p [] <| List.map viewTitle researchLst
                --     ]
                ]


type alias Research =
    { id : Int
    , title : String
    , keywords : List String
    , created : String
    , author : String
    , issueId : Maybe Int
    , publicationStatus : PublicationStatus -- should be string?
    , publication : Maybe String
    }


type PublicationStatus
    = InProgress
    | Published
    | LocalPublication
    | Undecided


decodeResearch : Decoder (List Research)
decodeResearch =
    Json.Decode.list entry


calcStatus : Research -> PublicationStatus
calcStatus research =
    case research.publicationStatus of
        InProgress ->
            InProgress

        _ ->
            case research.issueId of
                Just _ ->
                    Published

                Nothing ->
                    Published


entry : Decoder Research
entry =
    let
        researchPublicationStatus : Research -> Research
        researchPublicationStatus research =
            { research | publicationStatus = calcStatus research }

        statusFromString : String -> PublicationStatus
        statusFromString statusString =
            case statusString of
                "published" ->
                    Published

                "in progress" ->
                    InProgress

                _ ->
                    Undecided
    in
    Json.Decode.map researchPublicationStatus <|
        (Json.Decode.succeed
            Research
            |> JDE.andMap (field "id" int)
            |> JDE.andMap (field "title" string)
            |> JDE.andMap (field "keywords" (Json.Decode.list string))
            |> JDE.andMap (field "created" string)
            |> JDE.andMap (field "author" <| field "name" string)
            |> JDE.andMap (maybe (field "issue" <| field "id" int))
            |> JDE.andMap (Json.Decode.map statusFromString (field "status" string))
            |> JDE.andMap (maybe (field "published" string))
        )


searchLink : String -> String
searchLink term =
    "https://www.researchcatalogue.net/portal/search-result?fulltext=&title=&autocomplete=&keyword=" ++ term ++ "&portal=&statusprogress=0&statuspublished=0&includelimited=0&includeprivate=0&type_research=research&resulttype=research&format=html&limit=25&page=0" |> String.replace " " "%20"
