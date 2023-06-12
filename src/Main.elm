module Main exposing (..)

import Browser
import Dict exposing (Dict)
import Element exposing (Element, el, fill, height, padding, px, rgb, shrink, spacing, spacingXY, text, width)
import Element.Border
import Element.Font as Font
import Element.Input
import Element.Region
import Html exposing (Html, p)
import Html.Attributes as Attr exposing (style)
import Html.Events as Events
import Http
import Iso8601
import Json.Decode exposing (Decoder, field, int, maybe, string)
import Json.Decode.Extra as JDE
import Json.Encode as JE
import List exposing (reverse)
import RCStyles
import Random
import Random.List exposing (shuffle)
import String exposing (split)
import Time



-- TODO:
-- move sorting to main model, since it also applies to list.


type alias ExpositionID =
    Int


ofString : String -> Maybe ExpositionID
ofString x =
    String.toInt x


main : Program Flags Model Msg
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


type KeywordSorting
    = ByUse
    | Alphabetical


type ScreenOrder
    = Random
    | OldestFirst
    | NewestFirst



-- | Portal


type Scale
    = Micro
    | Small
    | Medium
    | Large


type View
    = KeywordsView KeywordsViewState
    | ListView
    | ScreenView Scale


type KeywordsViewState
    = KeywordMainView
    | KeywordDetail Keyword -- could be opaque type?


type alias Model =
    { research : List Research
    , reverseKeywordDict : Dict String (List Research) -- keys are Keywords, values are a list of Expositions that have that
    , keywords : KeywordSet
    , query : String
    , screenDimensions : { w : Int, h : Int }
    , sorting : KeywordSorting
    , view : View
    , numberOfResults : Int
    , researchSorting : ScreenOrder
    }


type Msg
    = GotResearch (Result Http.Error (List Research))
    | Randomized (List Research)
    | ChangedQuery String
    | SetSorting String
    | SwitchView String
    | LoadMore
    | NoScreenshot ExpositionID
    | ChangeScreenOrder String
    | ChangeScale String
    | ShowKeyword Keyword


type alias Flags =
    { width : Int
    , height : Int
    }


init : Flags -> ( Model, Cmd Msg )
init { width, height } =
    ( { research = []
      , reverseKeywordDict = Dict.empty
      , keywords = emptyKeywordSet
      , query = ""
      , screenDimensions = { w = width, h = height }
      , sorting = ByUse
      , view = KeywordsView KeywordMainView
      , numberOfResults = 8
      , researchSorting = Random
      }
    , Http.get { url = "internal_research.json", expect = Http.expectJson GotResearch decodeResearch }
    )


keywords : List Research -> List Keyword
keywords researchlist =
    researchlist
        |> keywordSet
        |> toList


keywordSet : List Research -> KeywordSet
keywordSet researchlist =
    List.foldr
        (\research set ->
            List.foldr insert set research.keywords
        )
        emptyKeywordSet
        researchlist


type Keyword
    = Keyword { count : Int, name : String }


kwName : Keyword -> String
kwName (Keyword kw) =
    kw.name


getCount : Keyword -> Int
getCount (Keyword kw) =
    kw.count


type KeywordSet
    = KeywordSet (Dict String Keyword)


toList : KeywordSet -> List Keyword
toList (KeywordSet kwSet) =
    Dict.toList kwSet |> List.map (\( _, keyword ) -> keyword)


filter : String -> List Keyword -> List Keyword
filter query lst =
    lst |> List.filter (\(Keyword kw) -> String.contains (query |> String.toLower) (kw.name |> String.toLower))


emptyKeywordSet : KeywordSet
emptyKeywordSet =
    KeywordSet Dict.empty


use : Keyword -> Keyword
use (Keyword kw) =
    Keyword { kw | count = kw.count + 1 }


newKey : String -> Keyword
newKey str =
    Keyword { count = 1, name = str }


insert : String -> KeywordSet -> KeywordSet
insert k (KeywordSet dict) =
    let
        result =
            Dict.get k dict
    in
    case result of
        Just (Keyword kw) ->
            KeywordSet (Dict.insert kw.name (use (Keyword kw)) dict)

        Nothing ->
            KeywordSet (Dict.insert k (newKey k) dict)


type Title
    = Title String


titles : List Research -> List Title
titles =
    List.map (.title >> Title)


shuffleResearch : Model -> ( Model, Cmd Msg )
shuffleResearch model =
    ( { model | research = [] }, Random.generate Randomized (shuffle model.research) )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotResearch result ->
            case result of
                Ok lst ->
                    let
                        reverseDict =
                            reverseKeywordDict lst
                    in
                    ( { model
                        | research = []
                        , reverseKeywordDict = reverseDict
                      }
                    , Random.generate Randomized (shuffle lst)
                    )

                Err err ->
                    let
                        _ =
                            Debug.log "whoops, error: " err
                    in
                    ( { model | research = [] }, Cmd.none )

        ChangedQuery q ->
            ( { model | query = q }, Cmd.none )

        Randomized lst ->
            ( { model | research = lst }, Cmd.none )

        SetSorting sort ->
            let
                _ =
                    Debug.log "what" sort
            in
            case sort of
                "ByUse" ->
                    ( { model | sorting = ByUse }, Cmd.none )

                "Alphabetical" ->
                    ( { model | sorting = Alphabetical }, Cmd.none )

                _ ->
                    ( { model | sorting = Alphabetical }, Cmd.none )

        SwitchView str ->
            let
                v =
                    case str of
                        "keywords" ->
                            KeywordsView KeywordMainView

                        "list" ->
                            ListView

                        "screenshots" ->
                            ScreenView Medium

                        _ ->
                            ListView
            in
            ( { model | view = v }, Cmd.none )

        ShowKeyword kw ->
            ( { model | view = KeywordsView (KeywordDetail kw) }, Cmd.none )

        LoadMore ->
            ( { model | numberOfResults = model.numberOfResults + 16 }, Cmd.none )

        NoScreenshot id ->
            let
                _ =
                    Debug.log "no screenshot for" id
            in
            ( model, Cmd.none )

        ChangeScreenOrder order ->
            case order of
                "random" ->
                    shuffleResearch { model | researchSorting = Random }

                "oldest" ->
                    let
                        fsort r =
                            r.created |> String.split "/" |> List.reverse |> String.join "/"
                    in
                    ( { model
                        | researchSorting = OldestFirst
                        , research = List.sortBy fsort model.research
                      }
                    , Cmd.none
                    )

                "newest" ->
                    let
                        fsort r =
                            r.created |> String.split "/" |> List.reverse |> String.join "/"
                    in
                    ( { model
                        | researchSorting = NewestFirst
                        , research = List.sortBy fsort model.research |> List.reverse
                      }
                    , Cmd.none
                    )

                _ ->
                    shuffleResearch { model | researchSorting = Random }

        ChangeScale str ->
            case str of
                "micro" ->
                    ( { model | view = ScreenView Micro }, Cmd.none )

                "small" ->
                    ( { model | view = ScreenView Small }, Cmd.none )

                "medium" ->
                    ( { model | view = ScreenView Medium }, Cmd.none )

                "large" ->
                    ( { model | view = ScreenView Large }, Cmd.none )

                _ ->
                    ( model, Cmd.none )


image : String -> String -> Element msg
image src description =
    Element.html <|
        Html.node "lazy-image"
            [ Attr.attribute "src" src
            , Attr.alt <| description
            , Attr.attribute "width" "100px"
            , Attr.attribute "height" "250px"
            ]
            []


viewResearch : Research -> Element Msg
viewResearch research =
    let
        img src desc =
            Element.link [ width fill ]
                { url = research.defaultPage
                , label =
                    Element.el
                        [ Element.centerX
                        , width fill
                        , height (px 200)
                        , Element.paddingXY 0 5
                        ]
                    <|
                        image src desc
                }

        short =
            research.abstract
                |> Maybe.withDefault "no abstract"
                |> shortAbstract
    in
    Element.column
        [ -- [ Border.width 0
          -- , Border.solid
          -- , Border.color (Element.rgb 0 0 0)
          width fill
        , height (px 400)
        , Element.centerX
        , Element.clip
        ]
        [ Maybe.map2 img research.thumbnail (research.abstract |> Maybe.map shortAbstract) |> Maybe.withDefault Element.none
        , Element.link [ width fill ] <|
            { label =
                Element.paragraph
                    [ Font.family [ Font.typeface "Open Sans", Font.sansSerif ]
                    , Font.size 16
                    , Element.Region.heading 1
                    , padding 5
                    , width fill
                    ]
                    [ Element.text research.title ]
            , url = research.defaultPage
            }
        , Element.link [ width fill ] <|
            { label =
                Element.paragraph
                    [ Font.family [ Font.typeface "Open Sans", Font.sansSerif ]
                    , Font.size 12
                    , Font.regular
                    , Element.Region.heading 2
                    , padding 5
                    , width fill
                    , Element.htmlAttribute (Attr.attribute "style" "text-transform: unset")
                    ]
                    [ Element.text <| authorAsString research.author ]
            , url = authorUrl research.author
            }
        , Element.paragraph
            [ padding 5
            , Font.size 15
            , Font.light
            , Font.color <| Element.rgb 0.33 0.33 0.33
            ]
            [ Element.text
                short
            ]
        ]


listAndThen : (a -> List b) -> List a -> List b
listAndThen f lst =
    lst |> List.map f |> List.concat


shortAbstract : String -> String
shortAbstract abstract =
    let
        splitted =
            abstract
                |> String.split "."
                |> listAndThen (String.split "?")
    in
    case splitted of
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


unfold : (state -> Maybe ( state, item )) -> state -> List item
unfold f start =
    case f start of
        Just ( state2, item ) ->
            item :: unfold f state2

        Nothing ->
            []


makeRowsOfN : Int -> List a -> List (List a)
makeRowsOfN rowSize lst =
    let
        f input =
            case List.take rowSize input of
                [] ->
                    Nothing

                some ->
                    Just ( some, List.drop rowSize input )
    in
    unfold f lst


viewList : Model -> Element Msg
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
            Element.column [ Element.spacing 5, Element.alignTop, width fill, Element.paddingXY 5 5 ]
                (List.map viewResearch lst)

        researchInProgress =
            List.filter (\r -> r.publicationStatus == InProgress) model.research

        published =
            List.filter (\r -> r.publicationStatus == Published) filtered
    in
    Element.column [ Element.spacingXY 0 25, Element.paddingXY 0 25 ]
        [ Element.row
            []
            [ published |> List.take model.numberOfResults |> researchColumn
            , published |> List.drop (model.numberOfResults * 2) |> List.take model.numberOfResults |> researchColumn
            , published |> List.drop (model.numberOfResults * 3) |> List.take model.numberOfResults |> researchColumn
            ]
        , Element.column [ width fill ]
            [ Element.Input.button
                (Element.centerX :: List.map Element.htmlAttribute RCStyles.rcButtonStyle)
                { onPress = Just LoadMore
                , label = Element.el [ Element.centerX, Font.size 18 ] <| Element.text "LOAD MORE"
                }
            ]
        ]


isScreenview : Model -> Bool
isScreenview model =
    case model.view of
        ScreenView _ ->
            True

        _ ->
            False


viewSwitch : Model -> Element Msg
viewSwitch model =
    Element.column [ spacing 10 ]
        [ Element.text "Screenshots/Keywords/List"
        , Element.el [] <|
            Element.html <|
                Html.select [ Events.onInput SwitchView ]
                    [ Html.option
                        [ Attr.value "screenshots"
                        , Attr.selected
                            (isScreenview model)
                        ]
                        [ Html.text "Screenshots" ]
                    , Html.option [ Attr.value "keywords", Attr.selected (isKeywordView model.view) ] [ Html.text "Keywords" ]
                    , Html.option [ Attr.value "list", Attr.selected (isListView model.view) ] [ Html.text "List" ]
                    ]
        ]


isListView : View -> Bool
isListView v =
    case v of
        ListView ->
            True

        _ ->
            False


isKeywordView : View -> Bool
isKeywordView v =
    case v of
        KeywordsView _ ->
            True

        _ ->
            False


screenViewOrderSwitch : Model -> Element Msg
screenViewOrderSwitch model =
    Element.column [ spacing 10 ]
        [ Element.text "Sort by:"
        , Element.el [] <|
            Element.html <|
                Html.select [ Events.onInput ChangeScreenOrder ]
                    [ Html.option [ Attr.value "random", Attr.selected (model.researchSorting == Random) ] [ Html.text "Random" ]
                    , Html.option [ Attr.value "oldest", Attr.selected (model.researchSorting == OldestFirst) ] [ Html.text "Old First" ]
                    , Html.option [ Attr.value "newest", Attr.selected (model.researchSorting == NewestFirst) ] [ Html.text "New first" ]
                    ]
        ]


viewScaleSwitch : Scale -> Element Msg
viewScaleSwitch scale =
    Element.column [ spacing 10 ]
        [ text "Zoom:"
        , el [] <|
            Element.html <|
                Html.select [ Events.onInput ChangeScale ]
                    [ Html.option [ Attr.value "micro", Attr.selected (scale == Micro) ] [ Html.text "Tiny" ]
                    , Html.option [ Attr.value "small", Attr.selected (scale == Small) ] [ Html.text "Small" ]
                    , Html.option [ Attr.value "medium", Attr.selected (scale == Medium) ] [ Html.text "Medium" ]
                    , Html.option [ Attr.value "large", Attr.selected (scale == Large) ] [ Html.text "Large" ]
                    ]
        ]


view : Model -> Html Msg
view model =
    let
        body =
            case model.view of
                ListView ->
                    Element.column [ width fill ]
                        [ Element.row [ Element.spacing 25 ] [ viewSwitch model, screenViewOrderSwitch model ]
                        , viewList model
                        ]

                KeywordsView kwtype ->
                    case kwtype of
                        KeywordMainView ->
                            Element.column [ width fill ]
                                [ viewSwitch model
                                , viewKeywords model
                                ]

                        KeywordDetail k ->
                            viewKeywordDetail k model

                ScreenView scale ->
                    Element.column [ width fill ]
                        [ Element.row [ Element.spacing 25 ] [ viewSwitch model, screenViewOrderSwitch model, viewScaleSwitch scale ]
                        , Element.html (viewScreenshots scale model)
                        ]
    in
    Element.layout
        [ width (Element.px (toFloat model.screenDimensions.w * 0.9 |> floor))
        , Font.family [ Font.typeface "Helvetica Neue", Font.sansSerif ]
        , Element.paddingEach { top = 50, left = 15, bottom = 25, right = 15 }
        ]
    <|
        Element.column [ width fill ]
            [ body ]


toggleSorting : Model -> Html Msg
toggleSorting model =
    Html.select [ Events.onInput SetSorting ]
        [ Html.option [ Attr.value "ByUse" ] [ Html.text "By Use" ]
        , Html.option [ Attr.value "Alphabetical" ] [ Html.text "Alphabetical" ]
        ]


viewKeywordDetail : Keyword -> Model -> Element Msg
viewKeywordDetail kw model =
    let
        researchWithKeyword =
            Dict.get (kwName kw) model.reverseKeywordDict |> Maybe.withDefault []

        -- the keywords that research with the same keyword uses:
        relatedKeywords =
            Debug.todo "implement keyword lookup"

        --researchWithKeyword |> List.map (\r -> r.keywords)
        viewRelatedKeyword : Keyword -> Element Msg
        viewRelatedKeyword rkw =
            Element.Input.button [] { onPress = Just (ShowKeyword rkw), label = Element.text (kwName rkw) }
    in
    -- generate a simple layout with two columns using Element
    Element.column [ width fill, Element.spacingXY 0 25 ]
        [ Element.row [ Element.spacing 25, width fill ] [ viewSwitch model, screenViewOrderSwitch model ]
        , Element.Input.button [] { onPress = Just (SwitchView "keywords"), label = Element.text "Back" }
        , Element.paragraph [ Font.size 36, padding 25, width fill ] [ Element.text (kwName kw), Element.text (getCount kw |> String.fromInt) ]
        , Element.paragraph [ Font.size 18 ] (List.map viewRelatedKeyword relatedKeywords)
        , researchWithKeyword |> List.map viewResearch |> makeColumns 3 [ width fill, spacing 25, Element.paddingXY 0 25 ]
        ]


viewKeywordAsButton : Keyword -> Element Msg
viewKeywordAsButton (Keyword k) =
    let
        name =
            k.name

        count =
            k.count
    in
    Element.row
        [ Element.spacing 5
        , Element.padding 5
        , Element.Border.solid
        , Element.Border.color (rgb 0.0 0.0 0.0)
        , Element.Border.width 1
        , width fill
        ]
        [ Element.Input.button [ Font.color (rgb 0.0 0.0 1.0) ]
            { onPress = Just (ShowKeyword (Keyword k))
            , label = Element.paragraph [ Element.centerX, Font.size 18 ] <| [ Element.el [ width fill ] <| Element.text name ]
            }
        , Element.el [ width fill, Element.alignLeft ] (Element.text (count |> String.fromInt))
        ]


viewKeywordAsLink : Keyword -> Element Msg
viewKeywordAsLink (Keyword kw) =
    let
        pixels =
            if kw.count > 12 then
                12 + kw.count

            else
                12 + kw.count
    in
    Html.span
        [-- Attr.style "font-size" ((pixels |> String.fromInt) ++ "px")
        ]
        [ Html.a
            [ Attr.href (searchLink kw.name)
            , Attr.style "display" "inline-block"
            , Attr.style "padding" "1em"
            , Attr.style "font-size" "1em"
            ]
            [ Html.text kw.name ]
        , Html.span [ Attr.style "font-size" "1em" ] [ Html.text <| (kw.count |> String.fromInt) ]
        ]
        |> Element.html


viewKeywords : Model -> Element Msg
viewKeywords model =
    let
        researchLst =
            model.research

        viewTitle r =
            Html.p [] [ Html.text r.title ]

        sortf =
            case model.sorting of
                ByUse ->
                    List.sortBy (\(Keyword k) -> k.count)

                Alphabetical ->
                    List.sortBy (\(Keyword k) -> k.name)

        keywordLst =
            researchLst |> keywords |> filter model.query |> sortf |> List.reverse

        keywordCount =
            let
                count =
                    "there are: " ++ (List.length keywordLst |> String.fromInt) ++ " keywords."
            in
            Element.text count

        lastDate =
            let
                dateStr =
                    findLastDate researchLst |> Iso8601.fromTime |> String.split "T" |> List.head |> Maybe.withDefault "?"
            in
            Element.el [ Font.size 12 ] (Element.text ("last updated: " ++ dateStr))

        keywordSearch : Element Msg
        keywordSearch =
            Element.Input.search [ width (px 200) ]
                { onChange = ChangedQuery
                , text = model.query
                , placeholder = Just (Element.Input.placeholder [] (Element.text "search for keyword"))
                , label = Element.Input.labelAbove [] (Element.text "search")
                }
    in
    Element.column [ width fill ]
        [ Element.row [ Element.spacingXY 50 10, width fill ]
            [ Element.el [ width shrink ] lastDate
            , Element.el [ width shrink ] <| Element.html (toggleSorting model)
            , Element.el [ width shrink ] keywordCount
            ]
        , Element.el [ width shrink ] keywordSearch
        , List.map viewKeywordAsButton keywordLst |> makeColumns 4 [ width fill, spacing 25, Element.paddingXY 25 25 ]
        ]


makeColumns : Int -> List (Element.Attribute Msg) -> List (Element Msg) -> Element Msg
makeColumns n attrs lst =
    Element.column attrs
        (lst
            |> makeNumColumns n
            |> List.map (\rowItems -> Element.row [ width fill, spacing 25 ] rowItems)
        )



-- Html.div
--     [ Attr.style "font-family" "Helvetica-Neue"
--     --, Attr.style "padding" ""
--     , Attr.style "width" "100%"
--     , Attr.style "text-align" "justify"
--     ]
--     [ Html.p [] [ Html.text ("This was generated on: " ++ lastDate) ]
--     , Html.div []
--         [ Html.h1 [] [ Html.text "Keywords" ]
--         , toggleSorting model
--         , Html.p [] [ Html.text keywordCount ]
--         , Html.input [ Attr.placeholder "Search for keyword", Attr.value model.query, Events.onInput ChangedQuery ] []
--         , Html.div [ Attr.style "white-space" "normal" ] <| List.map viewKeyword keywordLst
--         ]
-- , Html.div []
--     [ Html.h1 [] [ Html.text "titles" ]
--     , Html.p [] <| List.map viewTitle researchLst
--     ]


type Author
    = Author { id : Int, name : String }


authorAsString : Author -> String
authorAsString (Author a) =
    a.name


authorUrl : Author -> String
authorUrl (Author a) =
    "https://www.researchcatalogue.net/profile/?person=" ++ String.fromInt a.id


type alias Research =
    { id : ExpositionID
    , title : String
    , keywords : List String
    , created : String
    , author : Author
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

                "progress" ->
                    InProgress

                _ ->
                    Undecided

        author : Decoder Author
        author =
            let
                makeAuthor id name =
                    Author { id = id, name = name }
            in
            Json.Decode.map2
                makeAuthor
                (Json.Decode.field "id" Json.Decode.int)
                (Json.Decode.field "name" Json.Decode.string)
    in
    Json.Decode.map researchPublicationStatus <|
        (Json.Decode.succeed
            Research
            |> JDE.andMap (field "id" int)
            |> JDE.andMap (field "title" string)
            |> JDE.andMap (field "keywords" (Json.Decode.list string))
            |> JDE.andMap (field "created" string)
            |> JDE.andMap (field "author" author)
            |> JDE.andMap (maybe (field "issue" <| field "id" int))
            |> JDE.andMap (Json.Decode.map statusFromString (field "status" string))
            |> JDE.andMap (maybe (field "published" string))
            |> JDE.andMap (maybe (field "thumb" string))
            |> JDE.andMap (maybe (field "abstract" string))
            |> JDE.andMap (field "default-page" string)
        )


searchLink : String -> String
searchLink term =
    "https://www.researchcatalogue.net/portal/search-result?fulltext=&title=&autocomplete=&keyword=" ++ term ++ "&portal=&statusprogress=0&statuspublished=0&includelimited=0&includeprivate=0&type_research=research&resulttype=research&format=html&limit=25&page=0" |> String.replace " " "%20"


getName : Author -> String
getName (Author author) =
    author.name


imageWithErrorHandling : Research -> Html Msg
imageWithErrorHandling research =
    let
        urlFromId i =
            String.fromInt i |> (\fileName -> "/screenshots/" ++ fileName ++ ".jpeg")
    in
    Html.a [ Attr.href research.defaultPage, Attr.title (getName research.author ++ " - " ++ research.title) ]
        [ Html.img
            [ Attr.attribute "src" (urlFromId research.id)
            , Events.on "error" <| Json.Decode.succeed (NoScreenshot research.id)
            ]
            []
        ]


lazyImageWithErrorHandling : Int -> { w : Int, h : Int } -> Research -> Html Msg
lazyImageWithErrorHandling groupSize dimensions research =
    let
        urlFromId i =
            String.fromInt i |> (\fileName -> "/screenshots/" ++ fileName ++ ".jpeg")

        width =
            (((dimensions.w - 180) // groupSize) |> String.fromInt) ++ "px"

        height =
            (dimensions.h // (groupSize - 1) |> String.fromInt) ++ "px"
    in
    Html.a [ Attr.target "_blank", Attr.href research.defaultPage, Attr.title (getName research.author ++ " - " ++ research.title ++ " - " ++ research.created) ]
        [ Html.node "lazy-image"
            [ Attr.attribute "src" (urlFromId research.id)

            -- , Attr.alt <| "this is a screenshot of exposition: " ++ String.fromInt research.id
            , Attr.style "width" width
            , Attr.style "height" height
            ]
            []
        ]


splitGroupsOf : Int -> List a -> List (List a)
splitGroupsOf n lst =
    case lst of
        [] ->
            []

        _ ->
            let
                first =
                    List.take n lst

                rest =
                    List.drop n lst
            in
            first :: splitGroupsOf n rest


scaleToGroupSize : Scale -> Int
scaleToGroupSize scale =
    case scale of
        Micro ->
            16

        Small ->
            8

        Medium ->
            4

        Large ->
            3


viewScreenshots : Scale -> Model -> Html Msg
viewScreenshots scale model =
    let
        groupSize =
            scaleToGroupSize scale

        groups =
            model.research |> splitGroupsOf groupSize

        viewGroup group =
            Html.div [ Attr.style "display" "flex" ] (List.map (\exp -> lazyImageWithErrorHandling groupSize model.screenDimensions exp) group)
    in
    Html.div
        []
        [ Html.h1 [] [ Html.text "Visual" ]
        , Html.br [] []
        , Html.div []
            (List.map viewGroup groups)
        ]



-- this function creates a dictionary of all keywords and the research that have them


reverseKeywordDict : List Research -> Dict String (List Research)
reverseKeywordDict research =
    let
        addExpToKeyword : Research -> String -> Dict String (List Research) -> Dict String (List Research)
        addExpToKeyword exposition keyword currentDict =
            Dict.update keyword
                (\value ->
                    case value of
                        Nothing ->
                            Just [ exposition ]

                        Just lst ->
                            Just (exposition :: lst)
                )
                currentDict

        addResearchToDict exp currentDict =
            -- this exposition has keywords k1 k2 k3
            List.foldl (addExpToKeyword exp) currentDict exp.keywords
    in
    List.foldl addResearchToDict Dict.empty research


viewNeighbors : Research -> Dict String (List Research) -> Element Msg
viewNeighbors research reverseDict =
    let
        collected kw =
            Element.column []
                (Element.text ("keyword :" ++ kw)
                    :: (Dict.get kw reverseDict
                            |> Maybe.map (List.map viewResearch)
                            |> Maybe.withDefault [ Element.text "no other" ]
                       )
                )
    in
    Element.row []
        (List.map collected research.keywords)


makeNumColumns : Int -> List a -> List (List a)
makeNumColumns num input =
    let
        f n inp acc =
            case inp of
                [] ->
                    acc

                x :: xs ->
                    List.take num (x :: xs) :: f n (List.drop n (x :: xs)) acc
    in
    f num input []
