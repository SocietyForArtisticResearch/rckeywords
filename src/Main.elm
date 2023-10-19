port module Main exposing (Flags, Model, Msg, SearchAction, View, main)

import AppUrl exposing (AppUrl)
import Array
import Browser
import Browser.Dom as Dom
import Browser.Events as Events
import Browser.Navigation as Nav
import Date exposing (Date(..))
import Dict
import Element exposing (Element, column, el, fill, fillPortion, height, maximum, padding, paddingXY, px, rgb255, row, shrink, spacing, spacingXY, text, width)
import Element.Background
import Element.Border as Border
import Element.Font as Font
import Element.Input
import Element.Lazy
import Element.Region
import EnrichedResearch exposing (ResearchWithKeywords)
import Form
import Form.Field as Field
import Form.FieldView as FieldView
import Form.Validation as Validation
import Html exposing (Html, div)
import Html.Attributes as Attr
import Html.Events
import Json.Decode
import Json.Encode
import KeywordString exposing (KeywordString)
import List
import Page exposing (Scale(..), ScreenDimensions, makeNumColumns, transpose)
import Queries exposing (SearchQuery(..))
import RCStyles
import Regex
import Research as RC exposing (Research)
import Screenshots
import Set exposing (Set)
import String
import Tailwind.Utilities exposing (break_before_all)
import Task
import Time
import Url exposing (Url)



-- All RC data is managed by the Worker. This is done for speed in the GUI, since searches may be quite heavy.
-- To search, you send a query. The results are returned in receiveResults


port receiveResults : (Json.Decode.Value -> msg) -> Sub msg


port sendQuery : Json.Encode.Value -> Cmd msg


port problem : String -> Cmd msg


type alias Model =
    { query : String
    , search : SearchAction
    , screenDimensions : { w : Int, h : Int }
    , device : Device
    , view : View
    , key : Nav.Key
    , url : AppUrl
    , searchPageSize : Int
    , time : Int

    -- , keywords : Set String
    , searchGUI : Form.Model
    , formOpen : Bool
    , submitting : Bool
    , allKeywords : List KeywordString
    , allPortals : List RC.Portal
    }


type alias Flags =
    { width : Int
    , height : Int
    }


main : Program Flags Model Msg
main =
    Browser.application
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        , onUrlChange = UrlChanged
        , onUrlRequest = LinkClicked
        }


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ Events.onResize WindowResize
        , receiveResults ReceiveResults
        , Time.every 1000.0 Tick
        ]


type DateRange
    = DateRange Time.Posix Time.Posix


init : Flags -> Url -> Nav.Key -> ( Model, Cmd Msg )
init { width, height } url key =
    let
        initUrl : AppUrl
        initUrl =
            urlWhereFragmentIsPath url

        initView : View
        initView =
            SearchView
                { layout = ScreenLayout Medium
                , form = emptyForm
                , sorting = RC.Random
                , page = Page 1
                }
    in
    { query = ""
    , search = Idle
    , screenDimensions = { w = width, h = height }
    , view = initView
    , url = initUrl
    , key = key
    , searchPageSize = 20
    , device = classifyDevice { w = width, h = height }
    , formOpen = True
    , searchGUI = Form.init
    , submitting = False
    , allKeywords = []
    , allPortals = []
    , time = 0
    }
        |> (\model ->
                ( model
                , fetchKeywordsAndPortals
                )
           )



-- before doing anything else, ask worker for all keywords


fetchKeywordsAndPortals : Cmd Msg
fetchKeywordsAndPortals =
    Cmd.batch
        [ sendQuery
            (Queries.encodeSearchQuery Queries.GetAllKeywords)
        , sendQuery
            (Queries.encodeSearchQuery Queries.GetAllPortals)
        ]


resetViewport : Cmd Msg
resetViewport =
    Task.perform (\_ -> NoOp) (Dom.setViewport 0 0)



-- | Portal


type Problem
    = ResultProblem Json.Decode.Error
    | InvalidForm String


problemToString : Problem -> String
problemToString p =
    case p of
        ResultProblem e ->
            Json.Decode.errorToString e

        InvalidForm s ->
            s


type Page
    = Page Int


pageAsString : Page -> String
pageAsString (Page p) =
    p |> String.fromInt


pageSize : Int
pageSize =
    64



-- additionalKeywordsToLoad : Int
-- additionalKeywordsToLoad =
--     64


pageFromInt : Int -> Page
pageFromInt p =
    Page p


type alias SearchViewState =
    { layout : Layout
    , form : SearchForm
    , sorting : RC.TitleSorting
    , page : Page
    }



-- This should always contain all the state of the view.
-- If it is in this type, it should also get encoded in the URL.
-- handleUrl will parse a url into this view type. They should be "watertight"


type View
    = KeywordsView KeywordsViewState
    | SearchView SearchViewState
    | ExpositionView ExpositionViewState


type alias ExpositionViewState =
    { id : RC.ExpositionID }



-- TODO: add a table layout later


type Layout
    = ListLayout
    | ScreenLayout Scale


scaleToString : Scale -> String
scaleToString scale =
    case scale of
        Micro ->
            "micro"

        Small ->
            "small"

        Medium ->
            "medium"

        Large ->
            "large"


scaleFromString : String -> Maybe Scale
scaleFromString scale =
    case scale of
        "micro" ->
            Just Micro

        "small" ->
            Just Small

        "medium" ->
            Just Medium

        "large" ->
            Just Large

        _ ->
            Nothing



-- urlWithScale is a function to provide the correct link, so you can reuse this
-- in different paths and construct the needed url accordingly


viewScaleSwitch : Scale -> (Scale -> String) -> Element Msg
viewScaleSwitch scale urlWithScale =
    Element.row [ paddingXY 0 0, width fill, spacing 5, Font.color (Element.rgb 0.0 0.0 1.0) ]
        [ Element.el toggleLabelStyle <| Element.text "zoom:"
        , Element.link (linkStyle (scale == Micro) SmallLink) { url = urlWithScale Micro, label = Element.text "micro" }
        , Element.link (linkStyle (scale == Small) SmallLink) { url = urlWithScale Small, label = Element.text "small" }
        , Element.link (linkStyle (scale == Medium) SmallLink) { url = urlWithScale Medium, label = Element.text "medium" }
        , Element.link (linkStyle (scale == Large) SmallLink) { url = urlWithScale Large, label = Element.text "large" }
        ]


viewLayoutSwitch : Layout -> (Layout -> String) -> Element Msg
viewLayoutSwitch layout makeurl =
    let
        isScreenLayout l =
            case l of
                ScreenLayout _ ->
                    True

                _ ->
                    False
    in
    Element.row [ paddingXY 0 0, width fill, spacing 5, Font.color (Element.rgb 0.0 0.0 1.0) ]
        [ Element.el toggleLabelStyle <| text "display expositions as:"
        , Element.link (linkStyle (isScreenLayout layout) SmallLink) { url = makeurl (ScreenLayout Medium), label = Element.text "visual" }
        , Element.link (linkStyle (layout == ListLayout) SmallLink) { url = makeurl ListLayout, label = Element.text "list" }
        ]


type KeywordsViewState
    = KeywordMainView RC.KeywordSorting Page -- query, sorting, page
    | KeywordSearch String RC.KeywordSorting Page -- could be opaque type?


nextPage : KeywordsViewState -> KeywordsViewState
nextPage current =
    case current of
        KeywordMainView sorting (Page p) ->
            KeywordMainView sorting (Page (p + 1))

        KeywordSearch q sorting (Page p) ->
            KeywordSearch q sorting (Page (p + 1))


gotoPage : Page -> KeywordsViewState -> KeywordsViewState
gotoPage page current =
    case current of
        KeywordMainView sorting _ ->
            KeywordMainView sorting page

        KeywordSearch q sorting _ ->
            KeywordSearch q sorting page


type SearchAction
    = Idle
    | Searching
    | FoundKeywords (List RC.Keyword)
    | FoundResearch (List EnrichedResearch.ResearchWithKeywords)


type Device
    = Phone
    | Desktop
    | Tablet


classifyDevice : ScreenDimensions -> Device
classifyDevice { w, h } =
    if w <= 600 then
        Phone

    else if w <= 1110 then
        Tablet

    else
        Desktop


problemize : Problem -> Cmd Msg
problemize p =
    problem (problemToString p)


type Msg
    = ChangedQuery String
    | UrlChanged Url.Url
    | LinkClicked Browser.UrlRequest
    | ReceiveResults Json.Decode.Value
    | HitEnter
    | NoOp
    | FormMsg (Form.Msg Msg)
    | SubmitSearch (Form.Validated String SearchForm)
    | WindowResize Int Int
    | ToggleForm
    | Tick Time.Posix


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        ChangedQuery q ->
            ( { model | query = q }
            , Cmd.none
            )

        UrlChanged url ->
            let
                ( mdl, cmd ) =
                    handleUrl (url |> urlWhereFragmentIsPath) model
            in
            ( { mdl | url = url |> urlWhereFragmentIsPath }, cmd )

        LinkClicked urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    let
                        ( mdl, cmd ) =
                            handleUrl (url |> urlWhereFragmentIsPath) model
                    in
                    ( mdl
                    , Cmd.batch [ cmd, Nav.pushUrl model.key (Url.toString url), resetViewport ]
                    )

                Browser.External url ->
                    ( model
                    , Nav.load url
                    )

        ReceiveResults json ->
            let
                result =
                    Json.Decode.decodeValue Queries.decodeSearchResult json
            in
            case result of
                Ok (Queries.Keywords kws) ->
                    ( { model | search = FoundKeywords kws }, Cmd.none )

                Ok (Queries.Expositions exps) ->
                    ( { model | search = FoundResearch exps }, Cmd.none )

                Ok (Queries.AllKeywords kws) ->
                    let
                        updModel =
                            { model | allKeywords = kws |> List.map (RC.kwName >> KeywordString.fromString) }

                        ( m, c ) =
                            handleUrl updModel.url updModel
                    in
                    ( m, c )

                Ok (Queries.AllPortals portals) ->
                    ( { model | allPortals = portals }, Cmd.none )

                Err err ->
                    ( model, problemize (ResultProblem err) )

        HitEnter ->
            case model.view of
                KeywordsView (KeywordMainView sorting _) ->
                    ( { model | view = KeywordsView (KeywordMainView sorting (Page 1)), searchPageSize = 20 }
                    , Cmd.batch
                        [ sendQuery (Queries.encodeSearchQuery (FindKeywords model.query sorting))
                        , Nav.pushUrl model.key ("/#/keywords/search?q=" ++ model.query ++ "&sorting=" ++ RC.sortingToString sorting)
                        ]
                    )

                KeywordsView (KeywordSearch _ sorting _) ->
                    ( { model | view = KeywordsView (KeywordMainView sorting (Page 1)) }
                    , Cmd.batch
                        [ sendQuery (Queries.encodeSearchQuery (FindKeywords model.query sorting))
                        , Nav.pushUrl model.key ("/#/keywords/search?q=" ++ model.query ++ "&sorting=" ++ RC.sortingToString sorting)
                        ]
                    )

                _ ->
                    ( model, Cmd.none )

        FormMsg formMsg ->
            let
                ( updatedFormModel, cmd ) =
                    Form.update formMsg model.searchGUI
            in
            ( { model | searchGUI = updatedFormModel }, cmd )

        SubmitSearch validated ->
            case validated of
                Form.Valid srch ->
                    let
                        newView =
                            updateViewWithSearch srch model.view
                    in
                    ( model
                    , Cmd.batch
                        [ Nav.pushUrl model.key (appUrlFromView newView)
                        ]
                    )

                Form.Invalid m err ->
                    let
                        formProblem =
                            InvalidForm
                                ("invalid form: "
                                    ++ (Maybe.map formToString m |> Maybe.withDefault "")
                                    ++ Dict.foldl (\k v acc -> k ++ " : " ++ String.join "" v ++ "\n" ++ acc) "" err
                                )
                    in
                    ( model, problemize formProblem )

        WindowResize width height ->
            let
                screendim =
                    { w = width, h = height }
            in
            ( { model
                | screenDimensions = screendim
                , device = classifyDevice screendim
              }
            , Cmd.none
            )

        ToggleForm ->
            ( { model | formOpen = not model.formOpen }, Cmd.none )

        Tick _ ->
            ( { model | time = model.time + 1 }, Cmd.none )


updateViewWithSearch : SearchForm -> View -> View
updateViewWithSearch srch v =
    case v of
        KeywordsView s ->
            KeywordsView s

        SearchView state ->
            SearchView
                { state
                    | page = Page 1
                    , form = srch
                }

        ExpositionView s ->
            ExpositionView s


urlWhereFragmentIsPath : Url -> AppUrl.AppUrl
urlWhereFragmentIsPath url =
    let
        warnMaybe : Maybe a -> Maybe a
        warnMaybe m =
            case m of
                Nothing ->
                    m

                Just something ->
                    Just something
    in
    url |> Url.toString |> String.replace "/#" "" |> Url.fromString |> warnMaybe |> Maybe.withDefault url |> AppUrl.fromUrl


noCmd : Model -> ( Model, Cmd Msg )
noCmd model =
    ( model, Cmd.none )


getSortingOfUrl : AppUrl -> Maybe RC.TitleSorting
getSortingOfUrl url =
    url.queryParameters
        |> Dict.get "sorting"
        |> Maybe.andThen List.head
        |> Maybe.map RC.titleSortingFromString


{-|

    When the url has changed, we update the view and/or send out a query

-}
handleUrl : AppUrl.AppUrl -> Model -> ( Model, Cmd Msg )
handleUrl url model =
    case url.path of
        [ "exposition" ] ->
            let
                exp_id =
                    url.queryParameters
                        |> Dict.get "id"
                        |> Maybe.andThen List.head
                        |> Maybe.andThen String.toInt
                        |> Maybe.withDefault 0
            in
            ( { model | view = ExpositionView { id = exp_id } }, Cmd.none )

        [ "keywords" ] ->
            let
                sorting : RC.KeywordSorting
                sorting =
                    url.queryParameters |> Dict.get "sorting" |> Maybe.andThen List.head |> Maybe.withDefault "byuse" |> RC.sortingFromString

                page =
                    url.queryParameters |> Dict.get "page" |> Maybe.andThen List.head |> Maybe.andThen String.toInt |> Maybe.withDefault 0 |> pageFromInt
            in
            ( { model
                | search = Searching
                , view = KeywordsView (KeywordMainView sorting page)
              }
            , sendQuery (Queries.encodeSearchQuery (FindKeywords "" sorting))
            )

        [ "keywords", "search" ] ->
            -- keywords/search?
            let
                q =
                    url.queryParameters |> Dict.get "q" |> Maybe.andThen List.head |> Maybe.withDefault ""

                sorting =
                    url.queryParameters |> Dict.get "sorting" |> Maybe.andThen List.head |> Maybe.map RC.sortingFromString |> Maybe.withDefault RC.ByUse

                page =
                    url.queryParameters |> Dict.get "page" |> Maybe.andThen List.head |> Maybe.andThen String.toInt |> Maybe.withDefault 1 |> pageFromInt

                cmd =
                    case q of
                        "" ->
                            sendQuery (Queries.encodeSearchQuery (FindKeywords "" sorting))

                        someQ ->
                            sendQuery (Queries.encodeSearchQuery (FindKeywords someQ sorting))

                --( someQ, RC.sortingToString sorting )
            in
            ( { model
                | query = q
                , view = KeywordsView (KeywordSearch q sorting page)
                , search = Searching
              }
            , cmd
            )

        [ "research", "search", "list" ] ->
            let
                sorting : RC.TitleSorting
                sorting =
                    getSortingOfUrl url |> Maybe.withDefault RC.NewestFirst

                keywords : List String
                keywords =
                    url.queryParameters
                        |> Dict.get "keyword"
                        |> Maybe.withDefault []

                page : Int
                page =
                    url.queryParameters
                        |> Dict.get "page"
                        |> Maybe.andThen List.head
                        |> Maybe.andThen String.toInt
                        |> Maybe.withDefault 1

                title : String
                title =
                    url.queryParameters
                        |> Dict.get "title"
                        |> Maybe.andThen List.head
                        |> Maybe.withDefault ""

                author : String
                author =
                    url.queryParameters
                        |> Dict.get "author"
                        |> Maybe.andThen List.head
                        |> Maybe.withDefault ""

                portal : String
                portal =
                    url.queryParameters
                        |> Dict.get "portal"
                        |> Maybe.andThen List.head
                        |> Maybe.withDefault ""

                after : Maybe Date
                after =
                    url.queryParameters
                        |> Dict.get "after"
                        |> Maybe.andThen List.head
                        |> Maybe.andThen String.toInt
                        |> Maybe.map Date.fromRataDie

                before : Maybe Date
                before =
                    url.queryParameters
                        |> Dict.get "before"
                        |> Maybe.andThen List.head
                        |> Maybe.andThen String.toInt
                        |> Maybe.map Date.fromRataDie

                --                _ = Debug.log "query parameters" (url.queryParameters,portal)
                cmd : Cmd msg
                cmd =
                    sendQuery
                        (Queries.encodeSearchQuery
                            (FindResearch
                                (Queries.emptySearch
                                    |> Queries.searchWithKeywords (Set.fromList keywords)
                                    |> Queries.withTitle title
                                    |> Queries.withAuthor author
                                    |> Queries.withPortal portal
                                    |> Queries.withAfter after
                                    |> Queries.withBefore before
                                )
                            )
                        )
            in
            ( { model
                | view =
                    SearchView
                        { layout = ListLayout
                        , form = formWith title author keywords portal after before
                        , sorting = sorting
                        , page = Page page
                        }
              }
            , cmd
            )

        [ "research", "search", "screen" ] ->
            let
                sorting : RC.TitleSorting
                sorting =
                    getSortingOfUrl url
                        |> Maybe.withDefault RC.NewestFirst

                keywords : List String
                keywords =
                    url.queryParameters
                        |> Dict.get "keyword"
                        |> Maybe.withDefault []

                title : String
                title =
                    url.queryParameters
                        |> Dict.get "title"
                        |> Maybe.andThen List.head
                        |> Maybe.withDefault ""

                author : String
                author =
                    url.queryParameters
                        |> Dict.get "author"
                        |> Maybe.andThen List.head
                        |> Maybe.withDefault ""

                scale : Scale
                scale =
                    url.queryParameters
                        |> Dict.get "scale"
                        |> Maybe.andThen List.head
                        |> Maybe.andThen scaleFromString
                        |> Maybe.withDefault Medium

                page : Int
                page =
                    url.queryParameters
                        |> Dict.get "page"
                        |> Maybe.andThen List.head
                        |> Maybe.andThen String.toInt
                        |> Maybe.withDefault 1

                portal : String
                portal =
                    url.queryParameters
                        |> Dict.get "portal"
                        |> Maybe.andThen List.head
                        |> Maybe.withDefault ""

                after : Maybe Date
                after =
                    url.queryParameters
                        |> Dict.get "after"
                        |> Maybe.andThen List.head
                        |> Maybe.andThen String.toInt
                        |> Maybe.map Date.fromRataDie

                before : Maybe Date
                before =
                    url.queryParameters
                        |> Dict.get "before"
                        |> Maybe.andThen List.head
                        |> Maybe.andThen String.toInt
                        |> Maybe.map Date.fromRataDie

                cmd : Cmd msg
                cmd =
                    sendQuery
                        (Queries.encodeSearchQuery
                            (FindResearch
                                (Queries.emptySearch
                                    |> Queries.searchWithKeywords (Set.fromList keywords)
                                    |> Queries.withAuthor author
                                    |> Queries.withTitle title
                                    |> Queries.withPortal portal
                                    |> Queries.withAfter after
                                    |> Queries.withBefore before
                                )
                            )
                        )
            in
            ( { model
                | view =
                    SearchView
                        { layout = ScreenLayout scale
                        , form = formWith title author keywords portal after before
                        , sorting = sorting
                        , page = Page page
                        }
              }
            , cmd
            )

        -- hallo
        _ ->
            ( { model
                | view =
                    SearchView
                        { layout = ListLayout
                        , form = emptyForm
                        , sorting = RC.NewestFirst
                        , page = Page 1
                        }
              }
            , Nav.pushUrl model.key "/#/research/search/list"
            )


image : ( Int, Int ) -> String -> Element msg
image ( w, h ) src =
    Element.html <|
        Html.node "lazy-image"
            [ Attr.attribute "src" src
            , Attr.alt <| ""
            , Attr.attribute "width" (String.fromInt w ++ "px")
            , Attr.attribute "height" (String.fromInt h ++ "px")
            ]
            []


microLinkStyle : List (Element.Attribute msg)
microLinkStyle =
    [ Font.family [ Font.typeface "Open Sans", RCStyles.globalFont ]
    , Font.size 16
    , Font.regular
    , Element.Region.heading 2
    , padding 0
    , width fill
    , Element.htmlAttribute (Attr.attribute "style" "text-transform: unset")
    ]


lightLink : List (Element.Attribute msg)
lightLink =
    [ Font.family [ Font.typeface "Open Sans", RCStyles.globalFont ]
    , Font.size 16
    , Font.light
    , Element.Region.heading 2
    , padding 5
    , width fill
    , Element.htmlAttribute (Attr.attribute "style" "text-transform: unset")
    ]


formatDate : Date -> String
formatDate date =
    Date.toIsoString date


isKwInAbstract : String -> KeywordString -> Bool
isKwInAbstract abstract kws =
    let
        kw =
            " " ++ KeywordString.toString kws ++ "[!.,? ;:]"

        maybeRegex =
            Regex.fromString kw

        regex =
            Maybe.withDefault Regex.never maybeRegex
    in
    Regex.contains regex abstract


sliceAbstract : Maybe String -> Int -> String
sliceAbstract abs max =
    let
        isGreaterThan : Int -> Int -> Bool
        isGreaterThan mx value =
            value > mx

        abstract =
            Maybe.withDefault "" abs

        fullStopsInAbstract =
            String.indexes "." abstract

        fullStopsAfterMax =
            List.filter (isGreaterThan max) fullStopsInAbstract

        firstFullStopAfterMax =
            Maybe.withDefault max (List.head fullStopsAfterMax)
    in
    String.left (firstFullStopAfterMax + 1) abstract


findKwsInAbstract : List KeywordString -> String -> ( List Int, List String )
findKwsInAbstract kws shortAbstract =
    let
        kwsInAbstract =
            List.map (findKwInAbstract shortAbstract) kws

        kwsSorted =
            List.drop 1 (List.sort kwsInAbstract)
    in
    List.unzip kwsSorted


findKwInAbstract : String -> KeywordString -> ( Int, String )
findKwInAbstract abstract kw =
    let
        extractIndex : Maybe Regex.Match -> Int
        extractIndex match =
            case match of
                Nothing ->
                    0

                Just m ->
                    m.index

        keyword =
            KeywordString.toString kw

        key =
            " " ++ keyword ++ "[!.,? ;:]"

        maybeRegex =
            Regex.fromString key

        regex =
            Maybe.withDefault Regex.never maybeRegex

        finds =
            Regex.find regex abstract

        first =
            List.head finds

        kwStart =
            extractIndex first
    in
    ( kwStart, keyword )


isSubkeyword : List String -> Int -> Bool
isSubkeyword keywords index =
    let
        kws =
            Array.fromList keywords

        kw =
            Maybe.withDefault "" (Array.get index kws)

        first =
            Array.slice 0 index kws

        second =
            Array.slice (index + 1) (Array.length kws) kws

        arr =
            Array.append first second

        bools =
            Array.map (String.contains kw) arr

        list =
            Array.toList bools
    in
    List.member True list


spacedWord : Element msg -> Element msg
spacedWord elem =
    Element.el [ Element.paddingXY 2 0 ] elem


viewResearchMicro : Int -> ScreenDimensions -> Device -> EnrichedResearch.ResearchWithKeywords -> Element Msg
viewResearchMicro numCollums screen device research =
    let
        ( w, h ) =
            case device of
                Phone ->
                    ( screen.w - 55, screen.w - 55 )

                Desktop ->
                    ( (screen.w // numCollums) - 50, screen.w // (numCollums + 1) )

                Tablet ->
                    ( (screen.w // numCollums) - 50, screen.w // (numCollums + 1) )

        -- abstract =
        --     Element.paragraph [ Font.size 12, width ((screen.w // 3) - 30  |> px ), padding 5 ] <| List.concat kwina
        abstract =
            Element.el [] (EnrichedResearch.renderAbstract research.abstractWithKeywords)

        img : String -> Element msg
        img src =
            Element.link [ width fill ]
                { url = appUrlFromExposition research
                , label =
                    Element.el
                        [ width (px (w + 30))
                        , height (px h)
                        , Element.paddingXY 0 5
                        ]
                    <|
                        image ( w, h ) src
                }

        imageUrl : String
        imageUrl =
            case research.thumbnail of
                Just thumb ->
                    thumb

                Nothing ->
                    research.id |> String.fromInt |> (\fileName -> "/screenshots/" ++ fileName ++ ".jpeg")

        title =
            Element.link [ width fill, Element.alignLeft ] <|
                { label =
                    Element.paragraph
                        (width (px w) :: microLinkStyle)
                        [ Element.text (research.title |> String.replace "&amp;" "&") ]
                , url = appUrlFromExposition research
                }

        author =
            Element.link [ width fill ] <|
                { label =
                    Element.paragraph
                        microLinkStyle
                        [ Element.text <| RC.authorAsString research.author ]
                , url = RC.authorUrl research.author
                }

        date =
            Element.el
                [ Font.size 12
                , Font.color (Element.rgb 0.1 0.0 0.0)
                , paddingXY 10 10
                , Font.italic
                ]
                (Element.text (research.publication |> Maybe.map formatDate |> Maybe.withDefault "in progress"))

        keywords =
            Element.el
                [ width fill ]
                (Element.paragraph []
                    (research.keywords
                        |> List.take 4
                        |> List.map (KeywordString.toString >> stringToKeyword >> spacedWord)
                    )
                )
    in
    column
        [ width fill
        , Font.size 12
        , Element.spacingXY 0 10
        ]
        [ title
        , img imageUrl
        , Element.el [] author
        , keywords
        , Element.paragraph [ Font.size 12, Font.family [ RCStyles.globalFont ], width (px w) ] [ abstract, date ]
        , Element.el
            [ paddingXY 0 10
            , width fill
            , Border.solid
            , Border.color RCStyles.lightGray
            , Border.widthEach { bottom = 0, top = 1, left = 0, right = 0 }
            ]
          <|
            Element.html <|
                Html.hr [] []
        ]


isKeywordView : View -> Bool
isKeywordView v =
    case v of
        KeywordsView _ ->
            True

        _ ->
            False



{--
    Multiple pars for one key!
-}


withParametersList : List ( String, List String ) -> AppUrl.AppUrl -> AppUrl.AppUrl
withParametersList lst appUrl =
    { appUrl
        | queryParameters = List.foldl (\( k, v ) dict -> Dict.insert k v dict) appUrl.queryParameters lst
    }



{-
   only one parameter per key
-}


withParameters : List ( String, String ) -> AppUrl.AppUrl -> AppUrl.AppUrl
withParameters pars u =
    let
        singles =
            pars |> List.map (Tuple.mapSecond List.singleton)
    in
    { u | queryParameters = Dict.fromList singles }


{-| A single parameter
-}
withParameter : ( String, String ) -> AppUrl.AppUrl -> AppUrl.AppUrl
withParameter ( key, value ) appurl =
    { appurl | queryParameters = appurl.queryParameters |> Dict.insert key [ value ] }


{-| We prefix all URLS with a hash, so we always route to index.html no matter
what the subpath is (instead of customizing the server config)
-}
prefixHash : String -> String
prefixHash str =
    "/#" ++ str


black : Element.Color
black =
    Element.rgb 0.0 0.0 0.0


gray : Element.Color
gray =
    Element.rgb 0.5 0.5 0.5


red =
    Element.rgb 0.5 0.0 0.0


white : Element.Color
white =
    Element.rgb 1.0 1.0 1.0


type LinkStyle
    = SmallLink
    | BigLink


{-|

    -----------
    | Button  |
    -----------

-}
linkStyle : Bool -> LinkStyle -> List (Element.Attribute msg)
linkStyle active style =
    let
        padding : number
        padding =
            case style of
                SmallLink ->
                    10

                BigLink ->
                    10

        fontSize : number
        fontSize =
            case style of
                SmallLink ->
                    12

                BigLink ->
                    15

        common : List (Element.Attr () msg)
        common =
            [ Border.color gray
            , Border.width 1
            , Element.padding padding
            , Element.Background.color white
            , Font.color black
            , Element.mouseOver [ Font.color (Element.rgb 0.5 0.5 0.5) ]
            , Font.size fontSize

            -- , Element.htmlAttribute <| Attr.class "link"
            ]
    in
    if active then
        List.append [ Font.underline, Border.solid ] common

    else
        Border.solid :: common


viewNav : View -> Element Msg
viewNav currentView =
    Element.row [ paddingXY 0 0, Element.Region.navigation, width fill, spacing 5, Font.color (Element.rgb 0.0 0.0 1.0) ]
        [ Element.link (linkStyle (isSearchView currentView) BigLink) { url = "/#/research/search/list", label = Element.text "Search" }
        , Element.link (linkStyle (isKeywordView currentView) BigLink) { url = "/#/keywords", label = Element.text "Keyword Map" }
        ]


isSearchView : View -> Bool
isSearchView v =
    case v of
        SearchView _ ->
            True

        _ ->
            False


view : Model -> Browser.Document Msg
view model =
    let
        body : Element Msg
        body =
            case model.view of
                KeywordsView kwtype ->
                    viewKeywords model kwtype

                SearchView sv ->
                    case model.search of
                        FoundResearch lst ->
                            viewResearchResults model.allPortals model.allKeywords model.submitting model.searchGUI model.screenDimensions model.device sv lst

                        FoundKeywords _ ->
                            Element.none

                        Searching ->
                            Element.text "..."

                        Idle ->
                            Element.none

                ExpositionView s ->
                    case model.search of
                        FoundResearch lst ->
                            lst
                                |> List.filter (\r -> r.id == s.id)
                                |> List.head
                                |> Maybe.map (viewExpositionDetails model.screenDimensions Medium)
                                |> Maybe.withDefault (Element.text "nothing to see")

                        Idle ->
                            Element.text "idle"

                        FoundKeywords _ ->
                            Element.text "still keywords"

                        Searching ->
                            Element.text "working hard"

        layoutWidth =
            case model.device of
                Phone ->
                    fill

                Tablet ->
                    fill

                Desktop ->
                    px model.screenDimensions.w
    in
    { title = "Research Catalogue - Screenshot Page"
    , body =
        [ Element.layout
            [ width layoutWidth
            , Font.family [ Font.typeface "Helvetica Neue", RCStyles.globalFont ]
            , Element.paddingEach { top = 40, left = 15, bottom = 25, right = 15 }
            ]
            (column [ width fill ]
                [ viewNav model.view, body ]
            )
        ]
    }



-- url of screenshots


screenshotFolder =
    "screenshots2"


viewExpositionDetails : ScreenDimensions -> Scale -> EnrichedResearch.ResearchWithKeywords -> Element Msg
viewExpositionDetails dim scale exposition =
    let
        makeImg w url =
            Element.image [ Element.width (px w) ] { src = url, description = "screenshot" }

        urlLst =
            exposition.screenshots
                |> Maybe.map
                    (Screenshots.getUrls screenshotFolder exposition.id)
    in
    case urlLst of
        Nothing ->
            Element.text "no screenshots"

        Just urls ->
            Page.makeMatrix dim scale makeImg urls



-- these are functions to navigate to a different page within a view


gotoPageView : Page -> View -> View
gotoPageView p v =
    case v of
        KeywordsView kwstate ->
            KeywordsView (gotoPage p kwstate)

        SearchView sv ->
            SearchView
                { sv
                    | page = p
                }

        ExpositionView s ->
            ExpositionView s


getPageOfView : View -> Page
getPageOfView v =
    case v of
        KeywordsView (KeywordMainView _ page) ->
            page

        SearchView sv ->
            sv.page

        _ ->
            Page 1


nextPageView : View -> View
nextPageView v =
    gotoPageView (getPageOfView v |> (\(Page p) -> p + 1 |> pageFromInt)) v


pageNav : Int -> View -> ScreenDimensions -> List a -> Page -> Element Msg
pageNav total v screen lst (Page p) =
    let
        pageLink n =
            Element.link (linkStyle (n == p) SmallLink)
                { url = (v |> gotoPageView (Page n) |> appUrlFromView) ++ "#top"
                , label = Element.text (n |> String.fromInt)
                }
    in
    if total >= p then
        let
            pageLinks =
                List.range 1 (total + 1) |> List.map pageLink

            nextLink =
                Element.el []
                    (Element.link ([ Element.Background.color (Element.rgb 1.0 0.0 0.0), Element.spacingXY 15 0 ] ++ linkStyle False SmallLink)
                        { url = (v |> nextPageView |> appUrlFromView) ++ "#top"
                        , label = Element.text "next"
                        }
                    )
        in
        Element.paragraph [ width (px (screen.w * 90 // 100)), Element.spacing 25, Element.paddingXY 0 25 ]
            (pageLinks ++ [ nextLink ])

    else
        Element.none


anchor : String -> Element.Attribute msg
anchor anchorId =
    Element.htmlAttribute (Attr.id anchorId)


viewResearchResults :
    List RC.Portal
    -> List KeywordString
    -> Bool
    -> Form.Model
    -> ScreenDimensions
    -> Device
    -> SearchViewState
    -> List ResearchWithKeywords
    -> Element Msg
viewResearchResults allPortals allKeywords submitting searchFormState dimensions device sv lst =
    let
        (Page p) =
            sv.page

        sorted : List ResearchWithKeywords
        sorted =
            lst |> sortResearch sv.sorting |> List.drop ((p - 1) * pageSize) |> List.take pageSize

        expositions : Element Msg
        expositions =
            case sv.layout of
                ListLayout ->
                    let
                        numCollumns =
                            case device of
                                Phone ->
                                    1

                                Tablet ->
                                    3

                                Desktop ->
                                    4
                    in
                    sorted
                        |> List.map (viewResearchMicro numCollumns dimensions device)
                        |> makeColumns numCollumns [ width fill, Element.spacingXY 10 10 ]

                ScreenLayout scale ->
                    viewScreenshots device dimensions sv scale sorted

        urlFromLayout : SearchViewState -> Layout -> String
        urlFromLayout st newlayout =
            SearchView { st | layout = newlayout } |> appUrlFromView

        urlFromSorting : SearchViewState -> RC.TitleSorting -> String
        urlFromSorting st s =
            SearchView { st | sorting = s } |> appUrlFromView

        numberOfPages : Int
        numberOfPages =
            lst |> List.length |> (\n -> n // pageSize)

        scaleButton : Element Msg
        scaleButton =
            case sv.layout of
                ListLayout ->
                    Element.none

                ScreenLayout scale ->
                    Element.el
                        [ case device of
                            Phone ->
                                Element.alignLeft

                            Desktop ->
                                Element.alignRight

                            Tablet ->
                                Element.alignRight
                        ]
                        (viewScaleSwitch scale (ScreenLayout >> urlFromLayout sv))

        buttons : Element Msg
        buttons =
            case device of
                Phone ->
                    column [ width fill, spacingXY 0 5 ]
                        [ Element.el [] <| viewLayoutSwitch sv.layout (urlFromLayout sv)
                        , scaleButton
                        , Element.el [] <| toggleTitleSorting sv.sorting (urlFromSorting sv)
                        ]

                Desktop ->
                    row
                        [ width fill, spacingXY 15 0 ]
                        [ Element.el [ Element.alignLeft ] <| viewLayoutSwitch sv.layout (urlFromLayout sv)
                        , scaleButton
                        , Element.el [ Element.alignRight ] <| toggleTitleSorting sv.sorting (urlFromSorting sv)
                        ]

                Tablet ->
                    row
                        [ width fill, spacingXY 15 0 ]
                        [ Element.el [ Element.alignLeft ] <| viewLayoutSwitch sv.layout (urlFromLayout sv)
                        , scaleButton
                        , Element.el [ Element.alignRight ] <| toggleTitleSorting sv.sorting (urlFromSorting sv)
                        ]
    in
    column [ anchor "top", spacingXY 0 5, width fill ] <|
        [ Element.el [ paddingXY 0 15, width fill ]
            (viewSearch device (Just sv.form) allPortals allKeywords submitting searchFormState)
        , buttons
        , expositions
        , pageNav numberOfPages (SearchView sv) dimensions sorted (Page p)
        ]


toggleSorting : RC.KeywordSorting -> Element Msg
toggleSorting sorting =
    Element.row [ paddingXY 0 0, Element.Region.navigation, width fill, spacing 5, Font.color (Element.rgb 0.0 0.0 1.0) ]
        [ Element.link (linkStyle (sorting == RC.ByUse) SmallLink) { url = "/#/keywords?sorting=" ++ RC.sortingToString RC.ByUse, label = Element.text "by use" }
        , Element.link (linkStyle (sorting == RC.Alphabetical) SmallLink) { url = "/#/keywords?sorting=" ++ RC.sortingToString RC.Alphabetical, label = Element.text "alphabetical" }
        , Element.link (linkStyle (sorting == RC.RandomKeyword) SmallLink) { url = "/#/keywords?sorting=" ++ RC.sortingToString RC.RandomKeyword, label = Element.text "random" }
        ]


toggleTitleSorting : RC.TitleSorting -> (RC.TitleSorting -> String) -> Element Msg
toggleTitleSorting sorting sortingToUrl =
    Element.row [ paddingXY 0 0, Element.Region.navigation, width fill, spacing 5, Font.color (Element.rgb 0.0 0.0 1.0) ]
        [ Element.el toggleLabelStyle <| Element.text "sort:"
        , Element.link (linkStyle (sorting == RC.Random) SmallLink) { url = sortingToUrl RC.Random, label = Element.text "random" }
        , Element.link (linkStyle (sorting == RC.NewestFirst) SmallLink) { url = sortingToUrl RC.NewestFirst, label = Element.text "newest first" }
        , Element.link (linkStyle (sorting == RC.OldestFirst) SmallLink) { url = sortingToUrl RC.OldestFirst, label = Element.text "oldest first" }
        ]


viewKeywordAsButton : Int -> RC.Keyword -> Element Msg
viewKeywordAsButton fontsize kw =
    let
        name : String
        name =
            RC.kwName kw |> String.toLower

        count : Int
        count =
            RC.getCount kw
    in
    Element.paragraph
        [ Element.spacing 5
        , Element.padding 5
        , Border.solid
        , Border.color (rgb255 144 144 144)
        , Border.width 1
        , Element.Background.color (rgb255 250 250 250)
        , Element.clipX
        , width fill
        , height (px 35)
        ]
        [ Element.link [ width fill ] { url = AppUrl.fromPath [ "research", "search", "list" ] |> withParameter ( "keyword", name ) |> AppUrl.toString |> prefixHash, label = Element.paragraph [ Element.centerX, Font.size fontsize ] <| [ Element.el [ width fill ] <| Element.text name ] }
        , Element.el [ width fill, Element.alignRight, Font.size fontsize ] (Element.text (count |> String.fromInt))
        ]


stringToKeyword : String -> Element Msg
stringToKeyword str =
    Element.link [ Font.size 12, Font.color gray, Font.underline ] <|
        { label = Element.text ("#" ++ str)
        , url = "/#/research/search/list?author&keyword=" ++ str ++ " "
        }


makeSnippet : List Int -> List Bool -> List String -> String -> Int -> List (Element Msg)
makeSnippet indexes subkeywords keywords abstract which =
    let
        kwsLength =
            List.length keywords

        idx =
            Array.fromList indexes

        kws =
            Array.fromList keywords

        subs =
            Array.fromList subkeywords

        isSub =
            Maybe.withDefault False (Array.get which subs)

        firstk =
            Maybe.withDefault "-1" (Array.get 0 kws)
    in
    if which == 0 then
        -- first kw
        let
            k =
                Maybe.withDefault -1 (Array.get which idx)

            -- I think this happens when the abstact is a white space
            -- this matches somehow the "?" keyword, which is then dropped creating an empty list
            keyw =
                Maybe.withDefault "" (Array.get which kws)

            kwlength =
                String.length keyw

            prevk =
                Maybe.withDefault 0 (Array.get (which - 1) idx)

            prevkeyw =
                Maybe.withDefault "" (Array.get (which - 1) kws)

            prevkwlength =
                String.length prevkeyw

            sliceLeft =
                String.slice (prevk + prevkwlength) (k + 1) abstract

            strToKw =
                stringToKeyword keyw
        in
        if isSub == True then
            [ text sliceLeft ]

        else
            [ text sliceLeft, strToKw ]

    else if which == kwsLength then
        -- append abstract end
        let
            k =
                Maybe.withDefault -1 (Array.get (which - 1) idx)

            keyw =
                Maybe.withDefault "-1" (Array.get (which - 1) kws)

            kwlength =
                String.length keyw

            sliceRight =
                String.dropLeft (k + kwlength + 1) abstract
        in
        [ text sliceRight ]

    else
        -- slice abstract snippet + insert kw link
        let
            k =
                Maybe.withDefault -1 (Array.get which idx)

            keyw =
                Maybe.withDefault ">>>>>>>>" (Array.get which kws)

            kwlength =
                String.length keyw

            prevk =
                Maybe.withDefault 0 (Array.get (which - 1) idx)

            prevkeyw =
                Maybe.withDefault "" (Array.get (which - 1) kws)

            prevkwlength =
                String.length prevkeyw

            sliceLeft =
                String.slice (prevk + prevkwlength + 1) (k + 1) abstract

            strToKw =
                stringToKeyword keyw
        in
        if isSub == True then
            [ text sliceLeft ]

        else
            [ text sliceLeft, strToKw ]


{-| on Enter
-}
onEnter : msg -> Element.Attribute msg
onEnter msg =
    Element.htmlAttribute
        (Html.Events.on "keyup"
            (Json.Decode.field "key" Json.Decode.string
                |> Json.Decode.andThen
                    (\key ->
                        if key == "Enter" then
                            Json.Decode.succeed msg

                        else
                            Json.Decode.fail "Not the enter key"
                    )
            )
        )


onAnyKey : msg -> Element.Attribute msg
onAnyKey msg =
    Element.htmlAttribute
        (Html.Events.on "keyup"
            (Json.Decode.field "key" Json.Decode.string
                |> Json.Decode.andThen
                    (\key ->
                        if key == "Enter" then
                            Json.Decode.fail "Not the enter key"

                        else
                            Json.Decode.succeed msg
                    )
            )
        )


pageToInt : Page -> Int
pageToInt (Page p) =
    p


appUrlFromView : View -> String
appUrlFromView v =
    case v of
        KeywordsView kwstate ->
            appUrlFromKeywordViewState kwstate

        SearchView sv ->
            appUrlFromSearchViewState sv

        ExpositionView s ->
            appUrlFromExpositionView s


maybeToList m =
    case m of
        Nothing ->
            []

        Just some ->
            [ some ]


dateToString : Date -> String
dateToString date =
    date |> Date.toRataDie |> String.fromInt


appUrlFromSearchViewState : SearchViewState -> String
appUrlFromSearchViewState sv =
    let
        appurl =
            case sv.layout of
                ListLayout ->
                    AppUrl.fromPath [ "research", "search", "list" ]
                        |> withParametersList
                            [ ( "keyword", sv.form.keywords )
                            , ( "title", [ sv.form.title ] )
                            , ( "author", [ sv.form.author ] )
                            , ( "sorting", [ RC.titleSortingToString sv.sorting ] )
                            , ( "page", [ pageAsString sv.page ] )
                            , ( "portal", [ sv.form.portal ] )
                            , ( "after", maybeToList (sv.form.after |> Maybe.map dateToString) ) -- in absence just url encode empty list
                            , ( "before", maybeToList (sv.form.before |> Maybe.map dateToString) )
                            ]

                ScreenLayout scale ->
                    AppUrl.fromPath [ "research", "search", "screen" ]
                        |> withParametersList
                            [ ( "keyword", sv.form.keywords )
                            , ( "title", [ sv.form.title ] )
                            , ( "author", [ sv.form.author ] )
                            , ( "sorting", [ RC.titleSortingToString sv.sorting ] )
                            , ( "page", [ pageAsString sv.page ] )
                            , ( "scale", [ scaleToString scale ] )
                            , ( "portal", [ sv.form.portal ] )
                            , ( "after", maybeToList (sv.form.after |> Maybe.map dateToString) ) -- in absence just url encode empty list
                            , ( "before", maybeToList (sv.form.before |> Maybe.map dateToString) )
                            ]
    in
    appurl |> AppUrl.toString |> prefixHash


appUrlFromExpositionView : ExpositionViewState -> String
appUrlFromExpositionView s =
    AppUrl.fromPath [ "exposition" ]
        |> withParameter ( "id", s.id |> String.fromInt )
        |> AppUrl.toString
        |> prefixHash


appUrlFromExposition : Research r -> String
appUrlFromExposition research =
    ExpositionViewState research.id |> appUrlFromExpositionView


appUrlFromKeywordViewState : KeywordsViewState -> String
appUrlFromKeywordViewState kwview =
    let
        url =
            case kwview of
                KeywordMainView sorting (Page p) ->
                    AppUrl.fromPath [ "keywords" ]
                        |> withParameters
                            [ ( "sorting", RC.sortingToString sorting )
                            , ( "page", p |> String.fromInt )
                            ]

                KeywordSearch q sorting (Page p) ->
                    AppUrl.fromPath [ "keywords", "search" ]
                        |> withParameters
                            [ ( "q", q )
                            , ( "sorting", RC.sortingToString sorting )
                            , ( "page", p |> String.fromInt )
                            ]
    in
    AppUrl.toString url |> prefixHash


viewKeywords : Model -> KeywordsViewState -> Element Msg
viewKeywords model keywordview =
    let
        page =
            case keywordview of
                KeywordMainView _ p ->
                    p

                KeywordSearch _ _ p ->
                    p

        sorting =
            case keywordview of
                KeywordMainView s _ ->
                    s

                KeywordSearch _ s _ ->
                    s

        viewCount : List RC.Keyword -> Element msg
        viewCount lst =
            let
                count : Int
                count =
                    lst |> List.length

                p =
                    page |> pageToInt

                showing =
                    [ "results ", (p - 1) * pageSize |> String.fromInt, "-", min (p * pageSize) count |> String.fromInt, " (total: ", count |> String.fromInt, ")" ] |> String.concat
            in
            el [ Font.size 12 ] (Element.text showing)

        -- lastDate : Element msg
        -- lastDate =
        --     let
        --         dateStr : String
        --         dateStr =
        --             findLastDate model.research |> Iso8601.fromTime |> String.split "T" |> List.head |> Maybe.withDefault "?"
        --     in
        --     Element.el [ Font.size 12 ] (Element.text ("last updated: " ++ dateStr))
        keywordSearch : Element Msg
        keywordSearch =
            let
                shouldEnable : Bool
                shouldEnable =
                    case model.query of
                        "" ->
                            True

                        _ ->
                            False

                url : String
                url =
                    case model.query of
                        "" ->
                            KeywordMainView RC.ByUse (Page 1) |> appUrlFromKeywordViewState

                        nonEmpty ->
                            KeywordSearch nonEmpty RC.ByUse (Page 1) |> appUrlFromKeywordViewState
            in
            Element.row [ Element.spacingXY 15 0 ]
                [ Element.Input.search [ Border.rounded 0, width (px 200), onEnter HitEnter ]
                    { onChange = ChangedQuery
                    , text = model.query
                    , placeholder = Just (Element.Input.placeholder [ Font.size 16 ] (Element.text "search for keyword"))
                    , label = Element.Input.labelAbove [ Font.size 16, paddingXY 0 5 ] (Element.text "filter")
                    }
                , Element.link (Element.moveDown 12 :: linkStyle shouldEnable BigLink)
                    { url = url
                    , label = Element.text "search"
                    }
                ]

        pageNavigation : List a -> Page -> Element Msg
        pageNavigation lst (Page p) =
            let
                total =
                    lst |> List.length |> (\n -> n // pageSize)

                pageLink n =
                    Element.link (linkStyle (n == p) SmallLink)
                        { url = keywordview |> gotoPage (Page n) |> appUrlFromKeywordViewState
                        , label = Element.text (n |> String.fromInt)
                        }
            in
            if total >= p then
                let
                    pageLinks =
                        List.range 0 total |> List.map pageLink

                    nextLink =
                        Element.el []
                            (Element.link ([ Element.Background.color (Element.rgb 1.0 0.0 0.0), Element.spacingXY 15 0 ] ++ linkStyle False SmallLink)
                                { url = keywordview |> nextPage |> appUrlFromKeywordViewState
                                , label = Element.text "next"
                                }
                            )
                in
                Element.paragraph [ width (px (model.screenDimensions.w * 90 // 100)), Element.spacing 25, Element.paddingXY 0 25 ]
                    (pageLinks ++ [ nextLink ])

            else
                Element.none

        numCollumns =
            case model.device of
                Phone ->
                    1

                Tablet ->
                    3

                Desktop ->
                    4

        lazyf : SearchAction -> Element Msg -> Element Msg
        lazyf result searchbox =
            Element.column [ width fill, spacingXY 0 15 ]
                [ searchbox
                , case result of
                    FoundKeywords results ->
                        let
                            currentPage =
                                pageOfList page results
                        in
                        column [ width fill, Element.spacing 15 ]
                            [ Element.el [ width shrink, Element.paddingXY 0 5 ] (toggleSorting sorting)
                            , viewCount results
                            , currentPage |> List.map (viewKeywordAsButton 16) |> makeColumns numCollumns [ width fill, spacingXY 25 25 ]
                            , pageNavigation results page
                            ]

                    Idle ->
                        Element.text "idle"

                    Searching ->
                        Element.column []
                            [ Element.text "working..."
                            ]

                    FoundResearch _ ->
                        Element.text "found something else"
                ]
    in
    Element.Lazy.lazy2
        lazyf
        model.search
        keywordSearch



-- transposes : List (List a) -> List (List a)
-- transposes listOfLists =
--     let
--         _ =
--             Debug.log "length before" (List.map List.length listOfLists)
--         rowsLength listOfListss =
--             case listOfListss of
--                 [] ->
--                     0
--                 x :: _ ->
--                     List.length x
--         res =
--             List.foldr (List.map2 (::)) (List.repeat (rowsLength listOfLists) []) listOfLists
--         _ =
--             Debug.log "result" (List.map List.length res)
--     in
--     res
-- this is just a test to really see what is going on.


stupidBox =
    Element.el [ Element.Background.color red, width fill, height (px 50) ] (Element.text "fish?")


makeColumns : Int -> List (Element.Attribute Msg) -> List (Element Msg) -> Element Msg
makeColumns n attrs lst =
    let
        columns =
            lst
                |> makeNumColumns n
                |> transpose
    in
    Element.row attrs
        (columns |> List.map (\rowItems -> Element.column (Element.alignTop :: attrs) rowItems))


pageOfList : Page -> List a -> List a
pageOfList (Page i) lst =
    let
        start : Int
        start =
            (i - 1) * pageSize
    in
    lst
        |> List.drop start
        |> List.take pageSize



-- notInSet : Model -> RC.Keyword -> Bool
-- notInSet model kw =
--     let
--         name : String
--         name =
--             RC.kwName kw
--         set =
--             Set.toList model.keywords
--     in
--     if List.member name set then
--         False
--     else
--         True


urlFromScreenshotAndTime : Array.Array String -> Int -> String
urlFromScreenshotAndTime screenshots time =
    time |> modBy (Array.length screenshots) |> (\idx -> Array.get idx screenshots |> Maybe.withDefault "")


lazyImageWithErrorHandling : Int -> ScreenDimensions -> Research r -> Html Msg
lazyImageWithErrorHandling groupSize dimensions research =
    let
        device =
            classifyDevice dimensions

        urlFromId : Int -> String
        urlFromId i =
            String.fromInt i |> (\fileName -> "/screenshots/" ++ fileName ++ ".jpeg")

        width : String
        width =
            (((toFloat dimensions.w * 0.9 |> floor) // groupSize) |> String.fromInt) ++ "px"

        height : String
        height =
            case device of
                Desktop ->
                    (dimensions.h // (groupSize - 1) |> String.fromInt) ++ "px"

                Tablet ->
                    width

                Phone ->
                    width
    in
    Html.a [ Attr.target "_blank", Attr.href (appUrlFromExposition research), Attr.title (RC.getName research.author ++ " - " ++ research.title ++ " - " ++ research.created) ]
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
                first : List a
                first =
                    List.take n lst

                rest : List a
                rest =
                    List.drop n lst
            in
            first :: splitGroupsOf n rest


scaleToGroupSize : Device -> Scale -> Int
scaleToGroupSize device scale =
    case device of
        Phone ->
            case scale of
                Micro ->
                    6

                Small ->
                    3

                Medium ->
                    2

                Large ->
                    1

        Tablet ->
            case scale of
                Micro ->
                    5

                Small ->
                    4

                Medium ->
                    2

                Large ->
                    1

        Desktop ->
            case scale of
                Micro ->
                    16

                Small ->
                    8

                Medium ->
                    4

                Large ->
                    3


sortResearch : RC.TitleSorting -> List (Research r) -> List (Research r)
sortResearch sorting research =
    case sorting of
        RC.OldestFirst ->
            research |> List.sortBy (\r -> r.created)

        RC.Random ->
            research |> RC.shuffleWithSeed 42

        RC.NewestFirst ->
            research |> List.sortBy (\r -> r.created) |> List.reverse


viewScreenshots : Device -> ScreenDimensions -> SearchViewState -> Scale -> List (Research r) -> Element Msg
viewScreenshots device screenDimensions sv scale research =
    let
        groupSize : Int
        groupSize =
            scaleToGroupSize device scale

        groups : List (List (Research r))
        groups =
            research |> splitGroupsOf groupSize

        viewGroup : List (Research r) -> Html Msg
        viewGroup group =
            div [ Attr.style "display" "flex" ] (List.map (\exp -> lazyImageWithErrorHandling groupSize screenDimensions exp) group)
    in
    Element.el [ Element.paddingEach { paddingEachZero | top = 15 }, width fill ]
        (Element.html (div [] (List.map viewGroup groups)))


paddingEachZero : { top : Int, left : Int, right : Int, bottom : Int }
paddingEachZero =
    { top = 0, left = 0, right = 0, bottom = 0 }



-- div
--     []
--     [ Html.h1 [] [ Html.text "Visual" ]
--     , Html.br [] []
--     , div []
--         (List.map viewGroup groups)
--     ]
-- this function creates a dictionary of all keywords and the research that have them


type alias SearchForm =
    { title : String
    , author : String
    , keywords : List String
    , portal : String
    , after : Maybe Date
    , before : Maybe Date
    }


formToString : SearchForm -> String
formToString form =
    [ form.title
    , form.author
    , form.keywords |> String.join "\n"
    , form.portal
    ]
        |> String.join "\n"


emptyForm : SearchForm
emptyForm =
    { title = ""
    , author = ""
    , keywords = []
    , portal = ""
    , after = Nothing
    , before = Nothing
    }


formWith : String -> String -> List String -> String -> Maybe Date -> Maybe Date -> SearchForm
formWith title author keywords portal after before =
    { title = title
    , author = author
    , keywords = keywords
    , portal = portal
    , after = after
    , before = before
    }


searchForm : Maybe String -> Maybe String -> Maybe String -> Maybe String -> Maybe String -> Maybe Date -> Maybe Date -> SearchForm
searchForm title author keyword1 keyword2 portal after before =
    let
        nothingIsJustEmpty =
            Maybe.withDefault ""
    in
    SearchForm
        (nothingIsJustEmpty title)
        (nothingIsJustEmpty author)
        (List.filterMap identity [ keyword1, keyword2 ])
        (nothingIsJustEmpty portal)
        after
        before


quote : String -> String
quote str =
    "\"" ++ str ++ "\""


keywordField : List KeywordString -> { a | submitAttempted : Bool, errors : Form.Errors String } -> String -> Validation.Validation String (Maybe String) FieldView.Input { field : FieldView.Input } -> Html msg
keywordField keywords formState label field =
    let
        lengthIfParsed : Maybe (Maybe Int)
        lengthIfParsed =
            field
                |> Validation.value
                |> Maybe.map (Maybe.map String.length)

        isLongEnough : String -> Bool
        isLongEnough str =
            case lengthIfParsed of
                Nothing ->
                    True

                Just (Just n) ->
                    (str |> String.length) - 1 >= n

                _ ->
                    False

        kwStrings : List String
        kwStrings =
            keywords |> List.map KeywordString.toString

        optimizedSuggestions : List String
        optimizedSuggestions =
            kwStrings
                |> List.filter isLongEnough
                |> List.sortBy String.length
    in
    div []
        [ Html.label labelStyle
            [ Html.text (label ++ " ")
            , field |> FieldView.input (Attr.list "keyword-field" :: fieldStyle)
            , Html.datalist [ Attr.id "keyword-field" ]
                (List.map
                    (\kw ->
                        Html.option [ Attr.value kw ] []
                    )
                    optimizedSuggestions
                )
            ]
        , (if formState.submitAttempted then
            formState.errors
                |> Form.errorsForField field
                |> List.map
                    (\error ->
                        Html.li [] [ Html.text error ]
                    )

           else
            []
          )
            |> Html.ul [ Attr.style "color" "red" ]
        ]



--searchGUI : List { a | name : String } -> List KeywordString -> Form.Form String { combine : Validation.Validation String SearchForm Never constraints3, view : { b | submitAttempted : Bool, errors : Form.Errors String, submitting : Bool } -> List (Html msg) } parsedCombined SearchForm


selectField formState label field =
    div [ Attr.style "width" "100%" ]
        [ Html.label labelStyle
            [ Html.text (label ++ " ")
            , FieldView.select dropdownStyle (\p -> ( [], p )) field
            ]
        , (if formState.submitAttempted then
            formState.errors
                |> Form.errorsForField field
                |> List.map
                    (\error ->
                        Html.li [] [ Html.text error ]
                    )

           else
            []
          )
            |> Html.ul [ Attr.style "color" "red" ]
        ]


searchGUI device portals keywords =
    let
        parseKeyword mk =
            case mk of
                Nothing ->
                    Ok Nothing

                Just k ->
                    if
                        keywords
                            |> List.map KeywordString.toString
                            |> List.member k
                    then
                        Ok (Just k)

                    else
                        Err (quote k ++ " not used")

        portalsAsOptions : List ( String, String )
        portalsAsOptions =
            ( "", "All portals" ) :: (portals |> List.map (\p -> ( p.name, p.name )))

        rowdiv elements =
            div [ Attr.style "display" "flex" ] elements
    in
    Form.form
        (\title author keyword1 keyword2 portal after before ->
            { combine =
                Validation.succeed searchForm
                    |> Validation.andMap title
                    |> Validation.andMap author
                    |> Validation.andMap
                        (keyword1
                            |> Validation.map parseKeyword
                            |> Validation.fromResult
                        )
                    |> Validation.andMap
                        (keyword2
                            |> Validation.map parseKeyword
                            |> Validation.fromResult
                        )
                    |> Validation.andMap
                        portal
                    |> Validation.andMap after
                    |> Validation.andMap before
            , view =
                \info ->
                    [ div [ Attr.style "width" "100%" ]
                        [ Html.h1 headerStyle [ Html.text "search:" ]
                        , Html.label []
                            [ case device of
                                Tablet ->
                                    div []
                                        [ rowdiv
                                            [ fieldView info "title" title
                                            , fieldView info "author" author
                                            ]
                                        , rowdiv
                                            [ keywordField keywords info "keywords" keyword1
                                            , keywordField keywords info "" keyword2
                                            ]
                                        , rowdiv
                                            [ fieldView info "after" after
                                            , fieldView info "before" before
                                            ]
                                        , div [] [ selectField info "portal" portal ]
                                        ]

                                Desktop ->
                                    div []
                                        [ rowdiv
                                            [ fieldView info "title" title
                                            , fieldView info "author" author
                                            , keywordField keywords info "keywords" keyword1
                                            , keywordField keywords info "" keyword2
                                            , selectField info "portal" portal
                                            ]
                                        , rowdiv
                                            [ fieldView info "after" after
                                            , fieldView info "before" before
                                            ]
                                        ]

                                Phone ->
                                    div []
                                        [ fieldView info "title" title
                                        , fieldView info "author" author
                                        , keywordField keywords info "keywords" keyword1
                                        , keywordField keywords info "" keyword2
                                        , selectField info "portal" portal
                                        , fieldView info "after" after
                                        , fieldView info "before" before
                                        ]
                            ]
                        , Html.button submitButtonStyle
                            [ if info.submitting then
                                Html.text "searching..."

                              else
                                Html.text "search"
                            ]
                        ]
                    ]
            }
        )
        |> Form.field "title" (Field.text |> Field.search |> Field.withInitialValue .title)
        |> Form.field "author" (Field.text |> Field.search |> Field.withInitialValue .author)
        |> Form.field "keyword 1" (Field.text |> Field.search |> Field.withInitialValue getFirstKeyword)
        |> Form.field "keyword 2" (Field.text |> Field.search |> Field.withInitialValue getSecondKeyword)
        |> Form.field "portal" (Field.select portalsAsOptions (\_ -> "Error !!!") |> Field.withInitialValue (\_ -> "All portals"))
        |> Form.field "after" (Field.date { invalid = \_ -> "invalid date" })
        |> Form.field "before" (Field.date { invalid = \_ -> "invalid date" })


getFirstKeyword : SearchForm -> String
getFirstKeyword form =
    form.keywords |> List.head |> Maybe.withDefault ""


getSecondKeyword : SearchForm -> String
getSecondKeyword form =
    form.keywords
        |> List.tail
        |> Maybe.andThen List.head
        |> Maybe.withDefault ""


labelStyle : List (Html.Attribute msg)
labelStyle =
    [ Attr.style "display" "block"
    , Attr.style "font-size" "14px"
    , Attr.style "margin" "5px"
    ]


fieldStyle : List (Html.Attribute msg)
fieldStyle =
    [ Attr.style "padding" "5px"
    , Attr.style "margin" "5px 0"
    , Attr.style "border" "1px solid gray"
    , Attr.style "display" "block"
    ]


dropdownStyle : List (Html.Attribute msg)
dropdownStyle =
    [ Attr.style "margin" "5px 0px"
    , Attr.style "border" "1px solid gray"
    , Attr.style "display" "block"
    , Attr.style "width" "100%"
    , Attr.style "height" "28px"
    ]


headerStyle : List (Html.Attribute msg)
headerStyle =
    [ Attr.style "font-size" "16px"
    , Attr.style "margin" "5px 0 15px 5px"
    , Attr.style "font-weight" "600"
    ]


submitButtonStyle : List (Html.Attribute msg)
submitButtonStyle =
    [ Attr.style "border" "1px solid gray"
    , Attr.style "padding" "10px"
    , Attr.style "background-color" "white"
    , Attr.style "margin" "0px 5px"

    -- , Attr.style "float" "right"
    ]


toggleLabelStyle : List (Element.Attr decorative msg)
toggleLabelStyle =
    [ Font.size 12, Font.color black ]


fieldView formState label field =
    div []
        [ Html.label labelStyle
            [ Html.text (label ++ " ")
            , field |> FieldView.input fieldStyle
            ]
        , (if formState.submitAttempted then
            formState.errors
                |> Form.errorsForField field
                |> List.map
                    (\error ->
                        Html.li [] [ Html.text error ]
                    )

           else
            []
          )
            |> Html.ul [ Attr.style "color" "red" ]
        ]


dropdownView formState label field =
    div []
        [ Html.label labelStyle
            [ Html.text (label ++ " ")
            , field |> FieldView.input dropdownStyle
            ]
        , (if formState.submitAttempted then
            formState.errors
                |> Form.errorsForField field
                |> List.map
                    (\error ->
                        Html.li [] [ Html.text error ]
                    )

           else
            []
          )
            |> Html.ul [ Attr.style "color" "red" ]
        ]



-- portalField allPortals formState label field =
--     let
--         allPortalStrings : List String
--         allPortalStrings =
--             List.map .name allPortals
--     in
--     div []
--         [ Html.label labelStyle
--             [ Html.text (label ++ " ")
--             , field |> Form.FieldView.input ([ Attr.list "portal-field", Attr.attribute "autocomplete" "off" ] ++ fieldStyle)
--             , Html.datalist [ Attr.id "portal-field" ]
--                 (List.map
--                     (\portal ->
--                         Html.option [ Attr.value portal ] []
--                     )
--                     allPortalStrings
--                 )
--             ]
--         , (if formState.submitAttempted then
--             formState.errors
--                 |> Form.errorsForField field
--                 |> List.map
--                     (\error ->
--                         Html.li [] [ Html.text error ]
--                     )
--            else
--             []
--           )
--             |> Html.ul [ Attr.style "color" "red" ]
--         ]


viewSearch : Device -> Maybe SearchForm -> List RC.Portal -> List KeywordString -> Bool -> Form.Model -> Element Msg
viewSearch device initialForm portals keywords submitting searchFormState =
    case initialForm of
        Just formInput ->
            Element.el
                [ paddingXY 15 15
                , Border.solid
                , Border.color black
                , Border.width 1
                , width fill
                ]
            <|
                Element.html
                    (searchGUI device portals keywords
                        |> Form.renderHtml
                            { submitting = submitting
                            , state = searchFormState
                            , toMsg = FormMsg
                            }
                            (Form.options "search"
                                |> Form.withOnSubmit (\record -> SubmitSearch record.parsed)
                                |> Form.withInput formInput
                            )
                            []
                    )

        Nothing ->
            Element.text "loading form data.."
