module Main exposing (..)

import Browser
import Dict exposing (Dict)
import Element exposing (Element, fill, fillPortion, height, padding, paddingXY, px, width)
import Element.Font
import Element.Region
import Element exposing (Element)
import Element.Region as Region
import Graph
import Html exposing (Html, a, span)
import Html.Attributes as Attr
import Html.Events as Events
import Http
import Iso8601
import Json.Decode exposing (Decoder, field, int, maybe, string)
import Json.Decode.Extra as JDE
import KeywordGraph


main : Program () Model Msg
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
        Waiting _ ->
            Sub.none

        Ready model ->
            Sub.map KeywordGraphMsg (KeywordGraph.subscriptions model.keywordGraph)


type WindowSize
    = WindowSize { width : Int, height : Int }


type alias Flags =
    { height : Int
    , width : Int
    }


type Model
    = Waiting WindowSize
    | Ready InitializedModel


getWindowSize : Model -> WindowSize
getWindowSize model =
    case model of
        Waiting windowSize ->
            windowSize

        Ready initModel ->
            initModel.windowSize


type alias InitializedModel =
    { research : List Research
    , keywordSet : KeywordSet
    , query : String
    , keywordGraph : KeywordGraph.Model
    , windowSize : WindowSize
    }


type Display
    = Show
    | Hide


type Msg
    = GotResearch (Result Http.Error (List Research))
    | Randomized (List Research)
    | ChangedQuery String
    | ClickedKeyword String
    | KeywordGraphMsg KeywordGraph.Msg


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( Waiting (WindowSize { width = flags.width, height = flags.height })
    , Http.get { url = "internal_research.json", expect = Http.expectJson GotResearch decodeResearch }
    )


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


setKeywordId : Int -> Keyword -> Keyword
setKeywordId id (Keyword k) =
    Keyword { k | id = Id id }



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
            lst |> List.map getName

        edges =
            lst |> List.concatMap (edgesFromKeyword set)
    in
    Graph.fromNodeLabelsAndEdgePairs labels edges


flip : (a -> b -> c) -> (b -> a -> c)
flip f x y =
    f y x


graphFromKeyword : Int -> Keyword -> KeywordSet -> Graph.Graph String ()
graphFromKeyword depth kw set =
    let
        insertStringUnique : String -> List String -> List String
        insertStringUnique str lst =
            if List.member str lst |> not then
                str :: lst

            else
                lst

        refsFromKeyword : Keyword -> List Keyword
        refsFromKeyword (Keyword keyword) =
            keyword.refs
                |> List.concatMap
                    (\research ->
                        research.keywords
                            |> List.foldl insertStringUnique []
                            |> List.map (flip lookupString set)
                    )
                |> onlyTheJusts

        helper n lst =
            if n <= 0 then
                lst

            else
                helper (n - 1)
                    (List.concatMap refsFromKeyword lst
                        |> List.foldl
                            (\x acc ->
                                if List.member x acc then
                                    acc

                                else
                                    x :: acc
                            )
                            []
                    )

        limitedLst =
            helper depth [ kw ]

        labels =
            limitedLst |> List.map getName

        edges =
            limitedLst |> List.indexedMap setKeywordId |> List.concatMap (edgesFromKeyword set)

        _ =
            Debug.log ("edges are " ++ getName kw) edges
    in
    Graph.fromNodeLabelsAndEdgePairs labels edges


type Id
    = Id Int


type Keyword
    = Keyword { refs : List Research, name : String, display : Display, id : Id }


getName : Keyword -> String
getName (Keyword kw) =
    kw.name


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


emptyKeywordSet : KeywordSet
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


hide : Keyword -> Keyword
hide (Keyword k) =
    Keyword { k | display = Hide }


showInSet : String -> KeywordSet -> KeywordSet
showInSet key (KeywordSet set) =
    let
        newSet =
            Dict.map
                (\k v ->
                    if k == key then
                        toggle v

                    else
                        hide v
                )
                set.dict
    in
    KeywordSet { set | dict = newSet }


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


hasAtleast2Refs : Research -> Bool
hasAtleast2Refs research =
    List.length research.keywords > 2


update : Msg -> Model -> ( Model, Cmd Msg )
type Title
    = Title String


titles : List Research -> List Title
titles =
    List.map (.title >> Title)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case model of
        Waiting screensize ->
            case msg of
                GotResearch result ->
                    updateWithResult result model

                _ ->
                    ( Waiting screensize, Cmd.none )

        Ready initializedModel ->
            let
                ( newInitializedModel, cmd ) =
                    updateInitialized msg initializedModel
            in
            ( Ready newInitializedModel, cmd )


updateInitialized : Msg -> InitializedModel -> ( InitializedModel, Cmd Msg )
updateInitialized msg model =
    case msg of
        ChangedQuery q ->
            ( { model | query = q }, Cmd.none )

        ClickedKeyword k ->
            let
                newKeywords =
                    model.keywordSet |> showInSet k

                mGraph =
                    lookupString k model.keywordSet |> Maybe.map (\kw -> graphFromKeyword 1 kw model.keywordSet)

                localGraph =
                    case mGraph of
                        Nothing ->
                            Graph.empty

                        Just grph ->
                            grph

                ( gModel, gMsg ) =
                    KeywordGraph.init localGraph
            in
            ( { model
                | keywordSet = newKeywords
                , keywordGraph = gModel
              }
            , Cmd.map KeywordGraphMsg gMsg
            )

        KeywordGraphMsg kmsg ->
            let
                ( kmodel, kcmd ) =
                    KeywordGraph.update kmsg model.keywordGraph
            in
            ( { model | keywordGraph = kmodel }, Cmd.map KeywordGraphMsg kcmd )

        _ ->
            let
                _ =
                    Debug.log "impossible msg" msg
            in
            ( model, Cmd.none )


updateWithResult : Result Http.Error (List Research) -> Model -> ( Model, Cmd Msg )
updateWithResult result model =
    let
        window =
            getWindowSize model
    in
    case result of
        Ok lst ->
            let
                set =
                    lst |> keywords

                ( graphModel, cmd ) =
                    KeywordGraph.init Graph.empty
            in
            ( Ready
                { query = ""
                , keywordGraph = graphModel
                , research = lst
                , keywordSet = set
                , windowSize = window
                }
            , Cmd.map KeywordGraphMsg cmd
            )

        Err err ->
            let
                _ =
                    Debug.log "whoops, error: " err
            in
            ( Waiting window, Cmd.none )


inlineStyle =
    [ Attr.style "display" "inline-block"
    , Attr.style "padding" "1em"
    ]


viewResearch : Research -> Element Msg
viewResearch research =
    expositionLink research

        Randomized lst ->
            ( { model | research = lst }, Cmd.none )


image : String -> String -> Element msg
image src description =
    Element.html <|
        Html.img
            [ Attr.src src
            , Attr.style "object-fit" "fill"
            , Attr.alt <| description
            , Attr.attribute "width" "100%"
            , Attr.attribute "height" "100%"
            , Attr.property "loading" <| JE.string "lazy"
            ]
            []


viewResearch : Research -> Element Msg
viewResearch research =
    let
        img src desc =
            Element.link [ width fill ]
                { url = research.defaultPage
                , label =
                    Element.el [ Element.centerX, width fill, Element.height fill, Element.paddingXY 0 25 ] <| image src desc
                }

        short =
            research.abstract
                |> Maybe.withDefault "no abstract"
                |> shortAbstract
    in
    Element.column [ width fill, Element.centerX ]
        [ Maybe.map2 img research.thumbnail (research.abstract |> Maybe.map shortAbstract) |> Maybe.withDefault Element.none
        , Element.link [ width fill ] <|
            { label = Element.paragraph [ Element.Font.family [ Element.Font.typeface "PT Sans" ], Element.Region.heading 1, padding 25, width fill ] [ Element.text research.title ]
            , url = research.defaultPage
            }
        , Element.paragraph [ padding 25, Element.Font.light, Element.Font.color <| Element.rgb 0.33 0.33 0.33 ]
            [ Element.text
                short
            ]
        ]


shortAbstract : String -> String
shortAbstract abstract =
    case String.split "." abstract of
        head :: _ ->
            head ++ "."

        [] ->
            ""


splitInColumns : Int -> List a -> List (List a)
splitInColumns n lst =
    let
        size =
            List.length lst

        chunkSize =
            size // n

        remain =
            modBy n size

        columnLengths =
            List.repeat n chunkSize

        distribute : Int -> List Int -> List Int
        distribute x ls =
            case ls of
                [] ->
                    []

                lss ->
                    (List.take x ls |> List.map ((+) 1)) ++ List.drop x ls

        finalLengths =
            distribute remain columnLengths

        auxe lengths l =
            case ( l, lengths ) of
                ( _, [] ) ->
                    []

                ( [], _ ) ->
                    []

                ( xs, currentLength :: restLengths ) ->
                    List.take currentLength xs :: auxe restLengths (List.drop currentLength xs)
    in
    auxe finalLengths lst


viewList : Model -> Html Msg
viewList model =
    let
        filtered =
            List.filter
                (\r ->
                    case r.thumbnail of
                        Just _ ->
                            True

                        Nothing ->
                            False
                )
                model.research

        researchColumn lst =
            Element.column [ Element.alignTop, width fill, Element.paddingXY 10 10 ]
                (List.map viewResearch lst)

        cls =
            splitInColumns 3 (filtered |> List.take 64)
    in
    Element.layout [ Element.Font.family [ Element.Font.typeface "Helvetica Neue" ] ] <|
        Element.row [ width fill, height fill ]
            (cls |> List.map researchColumn)


view : Model -> Html Msg
view model =
    viewList model


viewKeywords : Model -> Html Msg
viewKeywords m =
    case m of
        Waiting dim ->
            Html.p [] [ Html.text "waiting" ]

        Ready model ->
            let
                researchLst =
                    model.research

                viewTitle r =
                    Html.p [] [ Html.text r.title ]

        viewKeyword (Keyword kw) =
            let
                pixels =
                    if kw.count > 12 then
                        20

                                    else
                                        12 + count

                                Show ->
                                    40

                        refs =
                            kw.refs |> List.foldr (\r acc -> r.keywords ++ acc) []
                    in
                    Element.html <|
                        Html.span
                            [ Attr.style "font-size" ((pixels |> String.fromInt) ++ "px")
                            ]
                            [ Html.a
                                (Attr.href (searchLink kw.name) :: inlineStyle)
                                [ Html.text kw.name ]
                            , Html.span []
                                [ Html.text <| (kw.refs |> List.length |> (+) 1 |> String.fromInt)
                                ]
                            , Html.input
                                [ Attr.type_ "checkbox"
                                , Attr.checked (kw.display == Show)
                                , Events.onClick (ClickedKeyword kw.name)
                                ]
                                []
                            ]

                keywordLst =
                    model.keywordSet |> toList |> filter model.query

                keywordCount =
                    "there are: " ++ (List.length keywordLst |> String.fromInt) ++ " keywords."

                width =
                    getWindowSize m |> (\(WindowSize ws) -> ws.width)

                height =
                    getWindowSize m |> (\(WindowSize ws) -> ws.height)
        
        lastDate =
            findLastDate researchLst |> Iso8601.fromTime |> String.split "T" |> List.head |> Maybe.withDefault "?"
    in
            Element.layout [] <|
                Element.row [ Element.width Element.fill, Element.height <| Element.px height ]
                    [ Element.el [ Element.width Element.fill ] <|
                        Element.html <|
                            Html.div
                                [ Attr.style "font-family" "monospace"
                                , Attr.style "font-size" "10px"
                                , Attr.style "padding" "2em"
        ]
                                [ Html.map KeywordGraphMsg (KeywordGraph.view model.keywordGraph) ]
                    , Element.column [ Element.width Element.fill, Element.scrollbarY, Element.height <| Element.px height ]
                        [ Element.el [] (Element.text ("This was generated on: " ++ lastDate))
                        , Element.el [ Region.heading 1 ] <| Element.text "Keywords"
                        , Element.el [] <| Element.text keywordCount
                        , Element.html <| Html.input [ Attr.placeholder "Search for keyword", Attr.value model.query, Events.onInput ChangedQuery ] []
                        , Element.wrappedRow [] <| List.map viewKeyword keywordLst
                        ]
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
    , thumbnail : Maybe String
    , abstract : Maybe String
    , defaultPage : String
    }


dateFromString : String -> Maybe Time.Posix
dateFromString str =
    let
        result =
            str |> String.split "/" |> List.reverse |> String.join "-" |> Iso8601.toTime
    in
    case result of
        Ok time ->
            Just time

        Err err ->
            let
                _ =
                    Debug.log "time error" err
            in
            Nothing


findLastDate : List Research -> Time.Posix
findLastDate lst =
    let
        onlyJust : List (Maybe a) -> List a
        onlyJust mlst =
            case mlst of
                (Just x) :: xs ->
                    x :: onlyJust xs

                Nothing :: xs ->
                    onlyJust xs

                [] ->
                    []
    in
    lst
        |> List.map (\r -> r.publication |> Maybe.andThen dateFromString)
        |> onlyJust
        |> List.sortBy Time.posixToMillis
        |> List.reverse
        |> List.head
        |> Maybe.withDefault (Time.millisToPosix 0)


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
            |> JDE.andMap (maybe (field "thumb" string))
            |> JDE.andMap (maybe (field "abstract" string))
            |> JDE.andMap (field "default-page" string)
        )


expositionLink : Research -> Element Msg
expositionLink research =
    let
        url =
            "https://www.researchcatalogue.net/profile/show-exposition?exposition=" ++ String.fromInt research.id
    in
    Element.link []
        { url = url
        , label = Element.text research.title
        }


searchLink : String -> String
searchLink term =
    "https://www.researchcatalogue.net/portal/search-result?fulltext=&title=&autocomplete=&keyword=" ++ term ++ "&portal=&statusprogress=0&statuspublished=0&includelimited=0&includeprivate=0&type_research=research&resulttype=research&format=html&limit=25&page=0" |> String.replace " " "%20"
