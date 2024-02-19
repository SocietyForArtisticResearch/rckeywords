port module Main exposing (Device, Flags, Model, Msg, SearchAction, View, main)

import AppUrl exposing (AppUrl)
import Browser
import Browser.Dom as Dom
import Browser.Events as Events
import Browser.Navigation as Nav
import Date exposing (Date)
import Dict
import Element exposing (Element, column, el, fill, height, layout, padding, paddingEach, paddingXY, px, rgb255, row, shrink, spacing, spacingXY, text, width)
import Element.Background
import Element.Border as Border
import Element.Font as Font
import Element.Input
import Element.Keyed
import Element.Lazy
import Element.Region
import EnrichedResearch exposing (ResearchWithKeywords)
import Form
import Form.Field as Field
import Form.FieldView as FieldView
import Form.Validation as Validation
import Html exposing (Html, div, th)
import Html.Attributes as Attr
import Html.Events
import Html.Keyed
import Json.Decode
import Json.Encode
import KeywordString exposing (KeywordString)
import List
import Page exposing (Scale(..), ScreenDimensions, makeNumColumns, transpose)
import Queries exposing (ExpositionSearch(..), SearchQuery(..))
import RCStyles exposing (withStandardPadding)
import Research as RC exposing (Research)
import Screenshots
import Set
import String
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
    , searchGUI : Form.Model -- TODO should this be in view ?? Or maybe we just keep it around just in case ?
    , formOpen : Bool
    , submitting : Bool
    , allKeywords : List KeywordString
    , allPortals : List RC.Portal
    , currentExposition : Result String EnrichedResearch.ResearchWithKeywords
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
        , Time.every 60000.0 Tick -- not needed now
        ]


init : Flags -> Url -> Nav.Key -> ( Model, Cmd Msg )
init { width, height } url key =
    let
        initUrl : AppUrl
        initUrl =
            urlWhereFragmentIsPath url

        initView : View
        initView =
            SearchView
                { layout = ListLayout
                , form = QuickSearch ""
                , sorting = RC.Rank
                , page = Page 1
                , interface = Show
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
    , currentExposition = Err "initial"
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


type SearchFormView
    = QuickSearch String
    | AdvancedSearch SearchForm


type alias SearchViewState =
    { layout : Layout
    , form : SearchFormView
    , sorting : RC.TitleSorting
    , page : Page
    , interface : Visibility
    }


type Visibility
    = Show
    | Hide



{-
   type PortalSorting = PSDefault

   type alias PortalViewState =
       { layout : Layout
       , sorting : PortalSorting
       }
-}


{-| This should always contain all the state of the view.
If it is in this type, it should also get encoded in the URL.
handleUrl will parse a url into this view type. They should be "watertight"
-}
type View
    = KeywordsView KeywordsViewState
    | SearchView SearchViewState
    | ExpositionView ExpositionViewState



-- | PortalView PortalViewState
-- just a helper


advancedSearchToggle : View -> View
advancedSearchToggle v =
    case v of
        SearchView svs ->
            case svs.form of
                AdvancedSearch _ ->
                    SearchView { svs | form = QuickSearch "" }

                QuickSearch _ ->
                    SearchView { svs | form = AdvancedSearch emptyForm }

        _ ->
            v


setSimpleSearch : String -> View -> View
setSimpleSearch str v =
    case v of
        SearchView svs ->
            case svs.form of
                AdvancedSearch _ ->
                    SearchView { svs | form = QuickSearch str }

                QuickSearch _ ->
                    SearchView { svs | form = QuickSearch str }

        _ ->
            v


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
        isScreenLayout : Layout -> Bool
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
      --| FoundResearch (List EnrichedResearch.ResearchWithKeywords)
    | FoundRankedResearch (Queries.RankedResult EnrichedResearch.ResearchWithKeywords)


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
    | Tick Time.Posix
    | ToggleAdvancedSearch
    | SimpleSearch String


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
                result : Result Json.Decode.Error Queries.SearchResult
                result =
                    Json.Decode.decodeValue Queries.decodeSearchResult json
            in
            case result of
                Ok (Queries.Keywords kws) ->
                    ( { model | search = FoundKeywords kws }, Cmd.none )

                -- Ok (Queries.Expositions exps) ->
                --     ( { model | search = FoundResearch exps }, Cmd.none )
                Ok (Queries.RankedExpositions rexps) ->
                    ( { model | search = FoundRankedResearch rexps } |> sortViewByRank, Cmd.none )

                Ok (Queries.AllKeywords kws) ->
                    let
                        updModel : Model
                        updModel =
                            { model | allKeywords = kws |> List.map (RC.kwName >> KeywordString.fromString) }
                    in
                    handleUrl updModel.url updModel

                Ok (Queries.AllPortals portals) ->
                    ( { model | allPortals = portals }, Cmd.none )

                Ok (Queries.Exposition expresult) ->
                    ( { model | currentExposition = expresult }, Cmd.none )

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
                        newView : View
                        newView =
                            updateViewWithSearch srch model.view
                    in
                    ( model
                    , Nav.pushUrl model.key (appUrlFromView newView)
                    )

                Form.Invalid m err ->
                    let
                        formProblem : Problem
                        formProblem =
                            InvalidForm
                                ("invalid form: "
                                    ++ (Maybe.map formToString m |> Maybe.withDefault "")
                                    ++ Dict.foldl (\k v acc -> k ++ " : " ++ String.concat v ++ "\n" ++ acc) "" err
                                )
                    in
                    ( model, problemize formProblem )

        WindowResize width height ->
            let
                screendim : Page.ScreenDimensions
                screendim =
                    { w = width, h = height }
            in
            ( { model
                | screenDimensions = screendim
                , device = classifyDevice screendim
              }
            , Cmd.none
            )

        Tick _ ->
            ( { model | time = model.time + 1 }, Cmd.none )

        ToggleAdvancedSearch ->
            ( { model | view = advancedSearchToggle model.view }, Cmd.none )

        SimpleSearch str ->
            ( { model | view = setSimpleSearch str model.view }
            , sendQuery (Queries.encodeSearchQuery (Queries.FindResearch (Queries.QuickSearch str)))
            )


sortViewByRank : Model -> Model
sortViewByRank model =
    case model.view of
        SearchView state ->
            case state.sorting of
                RC.Rank ->
                    { model | view = SearchView { state | sorting = RC.NewestFirst } }

                _ ->
                    { model | view = SearchView { state | sorting = RC.Rank } }

        _ ->
            model


updateViewWithSearch : SearchForm -> View -> View
updateViewWithSearch srch v =
    case v of
        KeywordsView s ->
            KeywordsView s

        SearchView state ->
            case srch.title of
                "" ->
                    SearchView
                        { state
                            | page = Page 1
                            , form = AdvancedSearch srch
                        }

                nonEmpty ->
                    SearchView
                        { state
                            | page = Page 1
                            , sorting = RC.Rank
                            , form = AdvancedSearch srch
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
                exp_id : RC.ExpositionID
                exp_id =
                    url.queryParameters
                        |> Dict.get "id"
                        |> Maybe.andThen List.head
                        |> Maybe.andThen String.toInt
                        |> Maybe.withDefault 0
            in
            ( { model | view = ExpositionView { id = exp_id } }, sendQuery (Queries.encodeSearchQuery (Queries.GetExposition exp_id)) )

        [ "keywords" ] ->
            let
                sorting : RC.KeywordSorting
                sorting =
                    url.queryParameters |> Dict.get "sorting" |> Maybe.andThen List.head |> Maybe.withDefault "byuse" |> RC.sortingFromString

                page : Page
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
            let
                q : String
                q =
                    url.queryParameters |> Dict.get "q" |> Maybe.andThen List.head |> Maybe.withDefault ""

                sorting : RC.KeywordSorting
                sorting =
                    url.queryParameters |> Dict.get "sorting" |> Maybe.andThen List.head |> Maybe.map RC.sortingFromString |> Maybe.withDefault RC.ByUse

                page : Page
                page =
                    url.queryParameters |> Dict.get "page" |> Maybe.andThen List.head |> Maybe.andThen String.toInt |> Maybe.withDefault 1 |> pageFromInt

                cmd : Cmd msg
                cmd =
                    case q of
                        "" ->
                            sendQuery (Queries.encodeSearchQuery (FindKeywords "" sorting))

                        someQ ->
                            sendQuery (Queries.encodeSearchQuery (FindKeywords someQ sorting))
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
                ( cmd, searchViewState ) =
                    searchViewFromUrl url ListLayout
            in
            ( { model
                | view =
                    SearchView searchViewState
              }
            , cmd
            )

        [ "research", "search", "screen" ] ->
            let
                scale : Scale
                scale =
                    url.queryParameters
                        |> Dict.get "scale"
                        |> Maybe.andThen List.head
                        |> Maybe.andThen scaleFromString
                        |> Maybe.withDefault Medium

                ( cmd, searchViewState ) =
                    searchViewFromUrl url (ScreenLayout scale)
            in
            ( { model
                | view = SearchView searchViewState
              }
            , cmd
            )

        _ ->
            ( { model
                | view =
                    SearchView
                        { layout = ListLayout
                        , form = QuickSearch ""
                        , sorting = RC.NewestFirst
                        , page = Page 1
                        , interface = Show
                        }
              }
            , Nav.pushUrl model.key "/#/research/search/list"
            )


searchViewFromUrl : AppUrl -> Layout -> ( Cmd Msg, SearchViewState )
searchViewFromUrl url layout =
    let
        advanced =
            url.queryParameters
                |> Dict.get "advanced"
                |> Maybe.andThen List.head
                |> Maybe.map
                    (\str ->
                        case str of
                            "0" ->
                                False

                            "1" ->
                                True

                            _ ->
                                False
                    )
                |> Maybe.withDefault True
    in
    if advanced then
        searchViewFromUrlAdvanced url layout

    else
        let
            quickSearchStr =
                url.queryParameters
                    |> Dict.get "quicksearch"
                    |> Maybe.andThen List.head
                    |> Maybe.withDefault ""

            cmd : Cmd msg
            cmd =
                sendQuery
                    (Queries.encodeSearchQuery
                        (FindResearch (Queries.QuickSearch quickSearchStr))
                    )

            interface =
                interfaceFromUrl url
        in
        ( cmd
        , { layout = layout
          , form = QuickSearch quickSearchStr
          , sorting = RC.Rank
          , page = Page 1
          , interface = interface
          }
        )


interfaceFromUrl : AppUrl.AppUrl -> Visibility
interfaceFromUrl url =
    url.queryParameters
        |> Dict.get "interface"
        |> Maybe.andThen List.head
        |> Maybe.map
            (\str ->
                case str of
                    "hide" ->
                        Hide

                    _ ->
                        Show
            )
        |> Maybe.withDefault Show


searchViewFromUrlAdvanced : AppUrl -> Layout -> ( Cmd Msg, SearchViewState )
searchViewFromUrlAdvanced url layout =
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

        abstract : String
        abstract =
            url.queryParameters
                |> Dict.get "abstract"
                |> Maybe.andThen List.head
                |> Maybe.withDefault ""

        cmd : Cmd msg
        cmd =
            sendQuery
                (Queries.encodeSearchQuery
                    (FindResearch <| Queries.Advanced (Queries.Search { title = title, author = author, keywords = Set.fromList keywords, abstract = abstract, after = after, before = before, portal = portal }))
                )
    in
    ( cmd
    , { layout = layout
      , form = AdvancedSearch (formWith title author keywords abstract portal after before)
      , sorting = sorting
      , page = Page page
      , interface = interfaceFromUrl url
      }
    )


image : String -> Element msg
image src =
    Element.html <|
        Html.img
            [ Attr.attribute "src" src
            , Attr.attribute "load" "lazy"
            , Attr.style "object-fit" "cover"
            , Attr.alt <| ""
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


authorLinkStyle : List (Element.Attribute msg)
authorLinkStyle =
    [ Font.family [ Font.typeface "Open Sans", RCStyles.globalFont ]
    , Font.size 13
    , Font.regular
    , Element.Region.heading 2
    , padding 0
    , width fill
    , Element.htmlAttribute (Attr.attribute "style" "text-transform: unset")
    ]


formatDate : Date -> String
formatDate date =
    Date.toIsoString date


spacedWord : Element msg -> Element msg
spacedWord elem =
    Element.el [ Element.paddingXY 2 0 ] elem


viewResearchMicro : Int -> ScreenDimensions -> Device -> EnrichedResearch.ResearchWithKeywords -> ( String, Element Msg )
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
                        [ width fill
                        , Element.paddingXY 0 5
                        ]
                    <|
                        image src
                }

        imageUrl : String
        imageUrl =
            -- let
            --     _ =
            --         Debug.log "thumb" research.thumbnail
            -- in
            case research.thumbnail of
                Just thumb ->
                    thumb

                Nothing ->
                    research.screenshots
                        |> Maybe.map
                            (Screenshots.getUrls "screenshots2" research.id)
                        |> Maybe.andThen List.head
                        |> Maybe.withDefault "/"

        title =
            Element.link [ width fill, Element.alignLeft, Font.italic ] <|
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
                        authorLinkStyle
                        [ Element.text <| RC.authorAsString research.author ]
                , url = RC.authorUrl research.author
                }

        date =
            Element.el
                [ Font.family [ Font.monospace ]
                ]
                (Element.text <| "(" ++ (research.publication |> Maybe.map formatDate |> Maybe.withDefault "") ++ ")")

        keywords =
            Element.el
                [ width fill ]
                (Element.paragraph []
                    (research.keywords
                        |> List.take 4
                        |> List.map (KeywordString.toString >> stringToKeyword >> spacedWord)
                    )
                )

        metabox =
            Element.column
                [ width fill
                , padding 10
                , Element.spacingXY 0 5
                ]
                [ title
                , row [ spacingXY 5 0 ] [ author, date ]
                , keywords
                , Element.el [ Font.size 12, Font.family [ RCStyles.globalFont ], width (px w) ] abstract
                , Element.el
                    [ Element.paddingEach { top = 10, bottom = 0, left = 0, right = 0 }
                    , width fill
                    ]
                  <|
                    Element.html <|
                        Html.hr [ Attr.style "width" "100%" ] []
                ]
    in
    ( research.id |> String.fromInt
    , column
        [ width (Element.maximum w fill)
        , Font.size 12

        -- , Border.solid
        -- , Border.width 1
        -- , Border.color (Element.rgb 255 0 0)
        ]
        [ img imageUrl
        , metabox
        ]
    )


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
    if hideInterface currentView then
        Element.none

    else
        Element.row [ paddingXY 0 0, Element.Region.navigation, width fill, spacing 5, Font.color (Element.rgb 0.0 0.0 1.0) ]
            [ Element.link (linkStyle (isSearchView currentView) BigLink) { url = "/#/research/search/list", label = Element.text "Search" }
            , Element.link (linkStyle (isKeywordView currentView) BigLink) { url = "/#/keywords", label = Element.text "Keyword Map" }
            ]


hideInterface : View -> Bool
hideInterface v =
    case v of
        SearchView sv ->
            case sv.interface of
                Show ->
                    False

                Hide ->
                    True

        _ ->
            False


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
                        -- FoundResearch lst ->
                        --     let
                        --         _ =
                        --             Debug.log "unranked" ""
                        --     in
                        --     --viewResearchResults model.allPortals model.allKeywords model.submitting model.searchGUI model.screenDimensions model.device sv lst
                        FoundRankedResearch ranked ->
                            viewRankedResults model.allPortals model.allKeywords model.submitting model.searchGUI model.screenDimensions model.device sv ranked

                        FoundKeywords _ ->
                            Element.none

                        Searching ->
                            Element.text "..."

                        Idle ->
                            Element.none

                ExpositionView s ->
                    case model.currentExposition of
                        Err e ->
                            Element.text (e ++ "exposition with id " ++ String.fromInt s.id)

                        Ok expo ->
                            viewResearchDetail model.screenDimensions Medium expo

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


viewResearchDetail : ScreenDimensions -> Scale -> EnrichedResearch.ResearchWithKeywords -> Element Msg
viewResearchDetail dim scale research =
    let
        w =
            400

        makeImg : Int -> Screenshots.WeaveScreenshot -> Element msg
        makeImg imgw data =
            Element.newTabLink []
                { url = data.weave
                , label =
                    Element.image [ Element.width (px imgw) ] { src = data.screenshot, description = "screenshot" }
                }

        urlLst : Maybe (List Screenshots.WeaveScreenshot)
        urlLst =
            research.screenshots
                |> Maybe.map
                    (Screenshots.getWeaveAndScreenshot screenshotFolder research.id)

        abstract : Element msg
        abstract =
            Element.el [] (EnrichedResearch.renderAbstract research.abstractWithKeywords)

        title : Element msg
        title =
            Element.newTabLink [ width fill, Element.alignLeft ] <|
                { label =
                    Element.paragraph
                        (width (px w) :: microLinkStyle)
                        [ Element.text (research.title |> String.replace "&amp;" "&") ]
                , url = research.defaultPage
                }

        date : Element msg
        date =
            Element.el
                [ Font.size 12
                , Font.color (Element.rgb 0.1 0.0 0.0)
                , paddingXY 10 10
                , Font.italic
                ]
                (Element.text (research.publication |> Maybe.map formatDate |> Maybe.withDefault "in progress"))

        keywords : Element Msg
        keywords =
            Element.el
                [ width fill ]
                (Element.paragraph []
                    (research.keywords
                        |> List.map (KeywordString.toString >> stringToKeyword >> spacedWord)
                    )
                )

        author : Element msg
        author =
            Element.newTabLink [ width fill ] <|
                { label =
                    Element.paragraph
                        microLinkStyle
                        [ Element.text <| RC.authorAsString research.author ]
                , url = RC.authorUrl research.author
                }

        pageAndId : String -> String
        pageAndId link =
            link
                |> String.split "/"
                |> List.reverse
                |> List.take 2
                |> (\res ->
                        case res of
                            [ pageid, researchid ] ->
                                -- note that we get them in reverse order
                                researchid ++ "/" ++ pageid

                            _ ->
                                "0/0"
                   )

        parsedLink : Element Msg
        parsedLink =
            Element.newTabLink
                [ paddingXY 5 10
                , Font.color (Element.rgb 0.0 0.0 1.0)
                , Font.size 16
                , Font.family [ RCStyles.globalFont ]
                ]
                { url = "https://keywords.sarconference2016.net/flaskapp/rcget/" ++ pageAndId research.defaultPage
                , label = Element.text "generate json from content"
                }

        metainfo : Element Msg
        metainfo =
            column
                RCStyles.metastyling
                [ title
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

        screenshotMatrix : Element msg
        screenshotMatrix =
            case urlLst of
                Nothing ->
                    Element.el RCStyles.metastyling <| Element.text "no screenshots available"

                Just urls ->
                    Page.makeMatrix dim scale makeImg urls
    in
    Element.column (RCStyles.withStandardPadding [ width fill ])
        [ metainfo
        , screenshotMatrix
        , parsedLink
        ]



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


pageNav : Int -> View -> ScreenDimensions -> Page -> Element Msg
pageNav total v screen (Page p) =
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


viewRankedResults :
    List RC.Portal
    -> List KeywordString
    -> Bool
    -> Form.Model
    -> ScreenDimensions
    -> Device
    -> SearchViewState
    -> Queries.RankedResult ResearchWithKeywords
    -> Element Msg
viewRankedResults allPortals allKeywords submitting searchFormState dimensions device sv lst =
    let
        (Page p) =
            sv.page

        pageSizeFromScale : Scale -> Int
        pageSizeFromScale scale =
            case scale of
                Micro ->
                    192

                Small ->
                    128

                Medium ->
                    64

                Large ->
                    32

        sorted : Scale -> List ResearchWithKeywords
        sorted scale =
            let
                ps =
                    pageSizeFromScale scale
            in
            lst |> sortResearch sv.sorting |> List.drop ((p - 1) * ps) |> List.take ps

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
                    sorted Medium
                        |> List.map (viewResearchMicro numCollumns dimensions device)
                        |> makeColumns numCollumns [ width fill, Element.spacingXY 10 10 ]

                ScreenLayout scale ->
                    viewScreenshots device dimensions sv scale (sorted scale)

        urlFromLayout : SearchViewState -> Layout -> String
        urlFromLayout st newlayout =
            SearchView { st | layout = newlayout } |> appUrlFromView

        urlFromSorting : SearchViewState -> RC.TitleSorting -> String
        urlFromSorting st s =
            SearchView { st | sorting = s } |> appUrlFromView

        numberOfPages : Int
        numberOfPages =
            case sv.layout of
                ScreenLayout scale ->
                    lst |> Queries.length |> (\n -> n // pageSizeFromScale scale)

                ListLayout ->
                    lst |> Queries.length |> (\n -> n // 64)

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
    column
        (RCStyles.withStandardPadding [ anchor "top", spacingXY 0 5, width fill ])
        [ viewSearch device sv allPortals allKeywords submitting searchFormState
        , case sv.interface of
            Show ->
                case sv.form of
                    AdvancedSearch _ ->
                        buttons

                    QuickSearch _ ->
                        Element.none

            Hide ->
                Element.none
        , Element.el [ paddingXY 15 0, width fill, Element.centerX ] expositions
        , pageNav numberOfPages (SearchView sv) dimensions (Page p)
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
        , Element.link (linkStyle (sorting == RC.Rank) SmallLink) { url = sortingToUrl RC.Rank, label = Element.text "rank" }
        ]


viewKeywordAsButton : Int -> RC.Keyword -> ( String, Element Msg )
viewKeywordAsButton fontsize kw =
    let
        name : String
        name =
            RC.kwName kw |> String.toLower

        count : Int
        count =
            RC.getCount kw

        body =
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
    in
    ( RC.kwName kw
    , body
    )


stringToKeyword : String -> Element Msg
stringToKeyword str =
    Element.link [ Font.size 12, Font.color gray, Font.underline ] <|
        { label = Element.text ("#" ++ str)
        , url = "/#/research/search/list?author&keyword=" ++ str ++ " "
        }


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


pageToInt : Page -> Int
pageToInt (Page p) =
    p


{-| constructs a url from view. All view state needs to be represented in the url (except for the expo data)
viewToUrl
viewAsUrl
-}
appUrlFromView : View -> String
appUrlFromView v =
    case v of
        KeywordsView kwstate ->
            appUrlFromKeywordViewState kwstate

        SearchView sv ->
            appUrlFromSearchViewState sv

        ExpositionView s ->
            appUrlFromExpositionView s


maybeToList : Maybe a -> List a
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
appUrlFromSearchViewState svs =
    let
        appurl =
            case svs.form of
                AdvancedSearch form ->
                    case svs.layout of
                        ListLayout ->
                            AppUrl.fromPath [ "research", "search", "list" ]
                                |> withParametersList
                                    [ ( "keyword", form.keywords )
                                    , ( "title", [ form.title ] )
                                    , ( "author", [ form.author ] )
                                    , ( "sorting", [ RC.titleSortingToString svs.sorting ] )
                                    , ( "abstract", [ form.abstract ] )
                                    , ( "page", [ pageAsString svs.page ] )
                                    , ( "portal", [ form.portal ] )
                                    , ( "after", maybeToList (form.after |> Maybe.map dateToString) ) -- in absence just url encode empty list
                                    , ( "before", maybeToList (form.before |> Maybe.map dateToString) )
                                    , ( "advanced", [ "1" ] )
                                    ]

                        ScreenLayout scale ->
                            AppUrl.fromPath [ "research", "search", "screen" ]
                                |> withParametersList
                                    [ ( "keyword", form.keywords )
                                    , ( "title", [ form.title ] )
                                    , ( "author", [ form.author ] )
                                    , ( "sorting", [ RC.titleSortingToString svs.sorting ] )
                                    , ( "abstract", [ form.abstract ] )
                                    , ( "page", [ pageAsString svs.page ] )
                                    , ( "scale", [ scaleToString scale ] )
                                    , ( "portal", [ form.portal ] )
                                    , ( "after", maybeToList (form.after |> Maybe.map dateToString) ) -- in absence just url encode empty list
                                    , ( "before", maybeToList (form.before |> Maybe.map dateToString) )
                                    , ( "advanced", [ "1" ] )
                                    ]

                QuickSearch query ->
                    AppUrl.fromPath [ "research", "search", "list" ]
                        |> withParametersList
                            [ ( "quickSearch", [ query ] )
                            , ( "sorting", [ RC.titleSortingToString svs.sorting ] )
                            , ( "advanced", [ "0" ] )
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


keywordPageSize : number
keywordPageSize =
    2048


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
                    [ "results ", (p - 1) * keywordPageSize |> String.fromInt, "-", min (p * keywordPageSize) count |> String.fromInt, " (total: ", count |> String.fromInt, ")" ] |> String.concat
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
                    lst |> List.length |> (\n -> n // keywordPageSize)

                pageLink n =
                    Element.link (linkStyle (n == p) SmallLink)
                        { url = keywordview |> gotoPage (Page n) |> appUrlFromKeywordViewState
                        , label = Element.text (n |> String.fromInt)
                        }
            in
            if total >= p then
                let
                    pageLinks =
                        List.range 1 total |> List.map pageLink

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
                                pageOfList keywordPageSize page results
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

                    -- FoundResearch _ ->
                    --     Element.text "found something else"
                    FoundRankedResearch _ ->
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


makeColumns : Int -> List (Element.Attribute Msg) -> List ( String, Element Msg ) -> Element Msg
makeColumns n attrs lst =
    let
        columns =
            lst
                |> makeNumColumns n
                |> transpose
    in
    Element.row attrs
        (columns |> List.map (\rowItems -> Element.Keyed.column (Element.alignTop :: attrs) rowItems))


pageOfList : Int -> Page -> List a -> List a
pageOfList psize (Page i) lst =
    let
        start : Int
        start =
            (i - 1) * psize
    in
    lst
        |> List.drop start
        |> List.take psize



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


lazyImageWithErrorHandling : Int -> ScreenDimensions -> EnrichedResearch.ResearchWithKeywords -> ( String, Html Msg )
lazyImageWithErrorHandling groupSize dimensions research =
    let
        device =
            classifyDevice dimensions

        urlFromId : Int -> String
        urlFromId i =
            String.fromInt i |> (\fileName -> "screenshots/" ++ fileName ++ ".jpeg")

        urlFromScreenshots : Maybe Screenshots.Exposition -> String
        urlFromScreenshots screenshots =
            screenshots
                |> Maybe.map
                    (Screenshots.getUrls screenshotFolder research.id)
                |> Maybe.andThen List.head
                |> Maybe.withDefault "noshot"

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
    ( research.id |> String.fromInt
    , Html.a [ Attr.target "_blank", Attr.href (appUrlFromExposition research), Attr.title (RC.getName research.author ++ " - " ++ research.title ++ " - " ++ research.created) ]
        [ Html.img
            [ Attr.attribute "src" (urlFromScreenshots research.screenshots)
            , Attr.attribute "load" "lazy"
            , Attr.style "object-fit" "contain"

            -- , Attr.alt <| "this is a screenshot of exposition: " ++ String.fromInt research.id
            , Attr.style "width" width
            , Attr.style "height" height
            ]
            []
        ]
    )


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


sortResearch : RC.TitleSorting -> Queries.RankedResult (Research r) -> List (Research r)
sortResearch sorting research =
    case sorting of
        RC.OldestFirst ->
            research |> Queries.toList |> List.sortBy (\r -> r.created)

        RC.Random ->
            research |> Queries.toList |> RC.shuffleWithSeed 42

        RC.NewestFirst ->
            research |> Queries.toList |> List.sortBy (\r -> r.created) |> List.reverse

        RC.Rank ->
            research |> Queries.sortByRank


viewScreenshots : Device -> ScreenDimensions -> SearchViewState -> Scale -> List EnrichedResearch.ResearchWithKeywords -> Element Msg
viewScreenshots device screenDimensions sv scale research =
    let
        groupSize : Int
        groupSize =
            scaleToGroupSize device scale

        groups : List (List ResearchWithKeywords)
        groups =
            research |> splitGroupsOf groupSize

        viewGroup : List ResearchWithKeywords -> Html Msg
        viewGroup group =
            Html.Keyed.node "div" [ Attr.style "display" "flex" ] (List.map (\exp -> lazyImageWithErrorHandling groupSize screenDimensions exp) group)
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
    , abstract : String
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
    , abstract = ""
    }


formWith : String -> String -> List String -> String -> String -> Maybe Date -> Maybe Date -> SearchForm
formWith title author keywords abstract portal after before =
    { title = title
    , author = author
    , keywords = keywords
    , abstract = abstract
    , portal = portal
    , after = after
    , before = before
    }


searchForm : Maybe String -> Maybe String -> Maybe String -> Maybe String -> Maybe String -> Maybe String -> Maybe Date -> Maybe Date -> SearchForm
searchForm title author keyword1 keyword2 abstract portal after before =
    let
        nothingIsJustEmpty =
            Maybe.withDefault ""
    in
    SearchForm
        (nothingIsJustEmpty title)
        (nothingIsJustEmpty author)
        (List.filterMap identity [ keyword1, keyword2 ])
        (nothingIsJustEmpty abstract)
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


searchGUI : Device -> List { a | name : String } -> List KeywordString -> Form.Form String { combine : Validation.Validation String SearchForm Never constraints3, view : { b | submitAttempted : Bool, errors : Form.Errors String, submitting : Bool } -> List (Html msg) } parsedCombined { title : String, author : String, keywords : List String, portal : String, after : Maybe Date, before : Maybe Date, abstract : String }
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
        (\title author keyword1 keyword2 abstract portal after before ->
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
                    |> Validation.andMap abstract
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
                                            , fieldView info "abstract" abstract
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
                                            , fieldView info "abstract" abstract
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
                                        , fieldView info "abstact" abstract
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
        |> Form.field "abstract" (Field.text |> Field.search |> Field.withInitialValue .abstract)
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


viewSearch : Device -> SearchViewState -> List RC.Portal -> List KeywordString -> Bool -> Form.Model -> Element Msg
viewSearch device svs portals keywords submitting searchFormState =
    let
        toggleView =
            Element.el [ width fill, Element.spacingXY 10 0 ] <|
                Element.Input.checkbox
                    [ Font.size 12, Element.width (Element.px 100), Element.alignRight ]
                    { label = Element.Input.labelRight [] (Element.text "advanced search")
                    , icon = Element.Input.defaultCheckbox
                    , onChange = always ToggleAdvancedSearch
                    , checked =
                        case svs.form of
                            AdvancedSearch _ ->
                                True

                            _ ->
                                False
                    }
    in
    case svs.form of
        AdvancedSearch frm ->
            case svs.interface of
                Show ->
                    Element.el
                        [ paddingXY 15 15
                        , Border.solid
                        , Border.color black
                        , Border.width 1
                        , width fill
                        ]
                    <|
                        Element.column []
                            [ toggleView
                            , Element.html
                                (searchGUI device portals keywords
                                    |> Form.renderHtml
                                        { submitting = submitting
                                        , state = searchFormState
                                        , toMsg = FormMsg
                                        }
                                        (Form.options "search"
                                            |> Form.withOnSubmit (\record -> SubmitSearch record.parsed)
                                            |> Form.withInput frm
                                        )
                                        []
                                )
                            ]

                Hide ->
                    Element.none

        QuickSearch simpleSearchQuery ->
            Element.row [ width fill ]
                [ Element.Input.text
                    [ Element.centerX, width (Element.fillPortion 3) ]
                    { onChange = SimpleSearch
                    , text = simpleSearchQuery
                    , placeholder = Nothing
                    , label = Element.Input.labelLeft [] <| Element.text "search"
                    }
                , toggleView
                ]
