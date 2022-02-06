module Main exposing (..)

import Browser
import Dict exposing (Dict)
import Html exposing (Html, span)
import Html.Attributes as Attr
import Html.Events as Events
import Http
import Json.Decode exposing (Decoder, field, int, maybe, string)
import Json.Decode.Extra as JDE


main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


type alias Model =
    { research : List Research
    , keywordSet : KeywordSet
    , query : String
    }


type Display
    = Show
    | Hide


type Msg
    = GotResearch (Result Http.Error (List Research))
    | ChangedQuery String
    | ClickedKeyword String


init : () -> ( Model, Cmd Msg )
init _ =
    ( { research = [], keywordSet = emptyKeywordSet, query = "" }
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


type Keyword
    = Keyword { refs : List Research, name : String, display : Display }


type KeywordSet
    = KeywordSet (Dict String Keyword)


toList : KeywordSet -> List Keyword
toList (KeywordSet kwSet) =
    Dict.toList kwSet |> List.map (\( _, keyword ) -> keyword)


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
    KeywordSet (Dict.update key (Maybe.map toggle) set)


emptyKeywordSet =
    KeywordSet Dict.empty


use : Research -> Keyword -> Keyword
use research (Keyword kw) =
    Keyword { kw | refs = research :: kw.refs }


newKey : String -> Keyword
newKey str =
    Keyword { refs = [], name = str, display = Hide }


insert : Research -> String -> KeywordSet -> KeywordSet
insert research k (KeywordSet dict) =
    let
        result =
            Dict.get k dict
    in
    case result of
        Just (Keyword kw) ->
            KeywordSet (Dict.insert kw.name (use research (Keyword kw)) dict)

        Nothing ->
            KeywordSet (Dict.insert k (newKey k) dict)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotResearch result ->
            case result of
                Ok lst ->
                    ( { model
                        | research = lst
                        , keywordSet = lst |> keywords
                      }
                    , Cmd.none
                    )

                Err err ->
                    let
                        _ =
                            Debug.log "whoops, error: " err
                    in
                    ( { model | research = [] }, Cmd.none )

        ChangedQuery q ->
            ( { model | query = q }, Cmd.none )

        ClickedKeyword k ->
            let
                newKeywords =
                    model.keywordSet |> showInSet k
            in
            ( { model | keywordSet = newKeywords }, Cmd.none )


inlineStyle =
    [ Attr.style "display" "inline-block"
    , Attr.style "padding" "1em"
    ]


view : Model -> Html Msg
view { research, query, keywordSet } =
    let
        researchLst =
            research

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
                            [ Html.p [] <| List.map (\ref -> span (inlineStyle++[Events.onClick <| ClickedKeyword ref ]) [ Html.text ref ]) refs ]
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
            keywordSet |> toList |> filter query

        keywordCount =
            "there are: " ++ (List.length keywordLst |> String.fromInt) ++ " keywords."
    in
    Html.div
        [ Attr.style "font-family" "monospace"
        ]
        [ Html.p [] [ Html.text "This was generated on February 2nd, 2022." ]
        , Html.div []
            [ Html.h1 [] [ Html.text "Keywords" ]
            , Html.p [] [ Html.text keywordCount ]
            , Html.input [ Attr.placeholder "Search for keyword", Attr.value query, Events.onInput ChangedQuery ] []
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
