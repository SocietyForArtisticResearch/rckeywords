port module Main exposing (Flags, Model, Msg, SearchAction, View, main)

import AppUrl exposing (AppUrl)
import Browser
import Browser.Dom as Dom
import Browser.Navigation as Nav
import Dict
import Element exposing (Element, el, fill, fillPortion, height, maximum, padding, paddingXY, px, rgb255, shrink, spacing, spacingXY, text, width)
import Element.Background
import Element.Border
import Element.Font as Font
import Element.Input
import Element.Lazy
import Element.Region
import Form
import Form.Field as Field
import Form.FieldView as FieldView
import Form.Validation as Validation
import Html exposing (Html)
import Html.Attributes as Attr
import Html.Events
import Json.Decode
import Json.Encode
import KeywordString exposing (KeywordString)
import List
import Queries exposing (SearchQuery(..))
import Research as RC exposing (Research)
import Set exposing (Set)
import String
import Task
import Time
import Url exposing (Url)



-- TODO:
-- move sorting to main model, since it also applies to list.


port receiveResults : (Json.Decode.Value -> msg) -> Sub msg


port sendQuery : Json.Encode.Value -> Cmd msg


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
    receiveResults ReceiveResults



-- | Portal


type Scale
    = Micro
    | Small
    | Medium
    | Large


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
-- in different paths and construct the needed link accordingly


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


type Page
    = Page Int


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



-- TODO: add a table layout later


type Layout
    = ListLayout
    | ScreenLayout Scale


pageAsString : Page -> String
pageAsString (Page p) =
    p |> String.fromInt


pageSize : Int
pageSize =
    128


additionalKeywordsToLoad : Int
additionalKeywordsToLoad =
    64


pageFromInt : Int -> Page
pageFromInt p =
    Page p


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
    | FoundResearch (List RC.Research)


type alias ScreenDimensions =
    { w : Int, h : Int }


type alias Model =
    { query : String
    , search : SearchAction
    , screenDimensions : { w : Int, h : Int }
    , view : View
    , numberOfResults : Int
    , key : Nav.Key
    , url : AppUrl
    , searchPageSize : Int
    , keywords : Set String
    , searchGUI : Form.Model
    , submitting : Bool
    , allKeywords : List KeywordString
    , allPortals : List RC.Portal
    }


type Msg
    = ChangedQuery String
    | UrlChanged Url.Url
    | LinkClicked Browser.UrlRequest
    | ReceiveResults Json.Decode.Value
    | HitEnter
    | NoOp
    | LoadMore
    | AddKeyword String
    | RemoveKeyword String
    | FormMsg (Form.Msg Msg)
    | SubmitSearch (Form.Validated String SearchForm)


type alias Flags =
    { width : Int
    , height : Int
    }


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
    , numberOfResults = 8
    , url = initUrl
    , key = key
    , searchPageSize = 20
    , keywords = Set.empty
    , searchGUI = Form.init
    , submitting = False
    , allKeywords = []
    , allPortals = []
    }
        |> handleUrl initUrl
        |> fetchKeywordsAndPortals



-- before doing anything else, ask worker for all keywords


fetchKeywordsAndPortals : ( Model, Cmd Msg ) -> ( Model, Cmd Msg )
fetchKeywordsAndPortals ( model, cmd ) =
    ( model
    , Cmd.batch
        [ sendQuery
            (Queries.encodeSearchQuery Queries.GetAllKeywords)
        , sendQuery
            (Queries.encodeSearchQuery Queries.GetAllPortals)
        , cmd
        ]
    )


resetViewport : Cmd Msg
resetViewport =
    Task.perform (\_ -> NoOp) (Dom.setViewport 0 0)


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
                    ( { model | allKeywords = kws |> List.map (RC.kwName >> KeywordString.fromString) }, Cmd.none )

                Ok (Queries.AllPortals portals) ->
                    ( { model | allPortals = portals }, Cmd.none )

                Err err ->
                    -- should turn into actual problem
                    let
                        _ =
                            Debug.log "why i don't see anything" err
                    in
                    ( model, Cmd.none )

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

        LoadMore ->
            ( { model | searchPageSize = model.searchPageSize + additionalKeywordsToLoad }
            , Cmd.none
            )

        AddKeyword kw ->
            ( { model | keywords = Set.insert kw model.keywords }
            , Cmd.none
            )

        RemoveKeyword kw ->
            ( { model | keywords = Set.remove kw model.keywords }
            , Cmd.none
            )

        FormMsg formMsg ->
            let
                ( updatedFormModel, cmd ) =
                    Form.update formMsg model.searchGUI
            in
            ( { model | searchGUI = updatedFormModel }, cmd )

        SubmitSearch validated ->
            -- TODO: update url with this search state
            case validated of
                Form.Valid srch ->
                    -- should update key
                    let
                        _ =
                            Debug.log "srch" srch

                        newView =
                            updateViewWithSearch srch model.view
                    in
                    ( { model
                        | view = newView
                        , search = Searching
                      }
                    , Cmd.batch
                        [ Nav.pushUrl model.key (appUrlFromView newView)
                        ]
                    )

                Form.Invalid m err ->
                    let
                        _ =
                            Debug.log "srch" ( m, err )
                    in
                    ( model, Cmd.none )


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


handleUrl : AppUrl.AppUrl -> Model -> ( Model, Cmd Msg )
handleUrl url model =
    case url.path of
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
                                )
                            )
                        )
            in
            ( { model
                | view =
                    SearchView
                        { layout = ListLayout
                        , form = formWith title author keywords portal
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

                cmd : Cmd msg
                cmd =
                    sendQuery
                        (Queries.encodeSearchQuery
                            (FindResearch
                                (Queries.emptySearch
                                    |> Queries.searchWithKeywords (Set.fromList keywords)
                                    |> Queries.withAuthor author
                                    |> Queries.withTitle title
                                )
                            )
                        )
            in
            ( { model
                | view =
                    SearchView
                        { layout = ScreenLayout scale
                        , form = formWith title author keywords portal
                        , sorting = sorting
                        , page = Page page
                        }
              }
            , cmd
            )

        _ ->
            ( { model
                | view =
                    SearchView
                        { layout = ListLayout
                        , form = formWith "" "" [] ""
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
            , Attr.alt <| "description"
            , Attr.attribute "width" (String.fromInt w ++ "px")
            , Attr.attribute "height" (String.fromInt h ++ "px")
            ]
            []


microLinkStyle : List (Element.Attribute msg)
microLinkStyle =
    [ Font.family [ Font.typeface "Open Sans", Font.sansSerif ]
    , Font.size 16
    , Font.regular
    , Element.Region.heading 2
    , padding 5
    , width fill
    , Element.htmlAttribute (Attr.attribute "style" "text-transform: unset")
    ]


lightLink : List (Element.Attribute msg)
lightLink =
    [ Font.family [ Font.typeface "Open Sans", Font.sansSerif ]
    , Font.size 16
    , Font.light
    , Element.Region.heading 2
    , padding 5
    , width fill
    , Element.htmlAttribute (Attr.attribute "style" "text-transform: unset")
    ]


viewResearchMicro : Research -> Element Msg
viewResearchMicro research =
    let
        ( w, h ) =
            ( 200, 200 )

        img : String -> Element msg
        img src =
            Element.link [ width (fillPortion 1) ]
                { url = research.defaultPage
                , label =
                    Element.el
                        [ width (px w)
                        , height (px h)
                        , Element.paddingXY 0 5
                        ]
                    <|
                        image ( w, h ) src
                }
    in
    case research.thumbnail of
        Just _ ->
            Element.row
                [ width fill
                , height (px 200)
                , Element.clip
                ]
                [ Maybe.map img research.thumbnail |> Maybe.withDefault Element.none
                , Element.column [ width (fillPortion 6), Element.alignTop ] <|
                    [ Element.link [ width fill, Element.alignLeft ] <|
                        { label =
                            Element.paragraph
                                (width (px w)::microLinkStyle)
                                [ Element.text research.title ]
                        , url = research.defaultPage
                        }
                    , Element.link [ width fill ] <|
                        { label =
                            Element.paragraph
                                microLinkStyle
                                [ Element.text <| RC.authorAsString research.author ]
                        , url = RC.authorUrl research.author
                        }
                    , Element.el lightLink (Element.text research.created)
                    ]
                ]

        Nothing ->
            let
                urlFromId : Int -> String
                urlFromId i =
                    String.fromInt i |> (\fileName -> "/screenshots/" ++ fileName ++ ".jpeg")
            in
            Element.row
                [ width fill
                , height (px 200)
                , Element.clip
                ]
                [ Maybe.map img (Just <| urlFromId research.id) |> Maybe.withDefault Element.none
                , Element.column [ width (fillPortion 6), Element.alignTop ] <|
                    [ Element.link [ width fill, Element.alignLeft ] <|
                        { label =
                            Element.paragraph
                                microLinkStyle
                                [ Element.text research.title ]
                        , url = research.defaultPage
                        }
                    , Element.link [ width fill ] <|
                        { label =
                            Element.paragraph
                                microLinkStyle
                                [ Element.text <| RC.authorAsString research.author ]
                        , url = RC.authorUrl research.author
                        }
                    , Element.el lightLink (Element.text research.created)
                    ]
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



{-
   A single parameter
-}


withParameter : ( String, String ) -> AppUrl.AppUrl -> AppUrl.AppUrl
withParameter ( key, value ) appurl =
    { appurl | queryParameters = appurl.queryParameters |> Dict.insert key [ value ] }


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
            [ Element.Border.color gray
            , Element.Border.width 1
            , Element.padding padding
            , Element.Background.color white
            , Font.color black
            , Element.mouseOver [ Font.color (Element.rgb 0.5 0.5 0.5) ]
            , Font.size fontSize
            ]
    in
    if active then
        List.append [ Font.underline, Element.Border.solid ] common

    else
        Element.Border.solid :: common


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
                            viewResearchResults model.allPortals model.allKeywords model.submitting model.searchGUI model.screenDimensions sv lst

                        FoundKeywords _ ->
                            Element.none

                        Searching ->
                            Element.text "waiting"

                        Idle ->
                            Element.text "idle"
    in
    { title = "Research Catalogue - Screenshot Page"
    , body =
        [ Element.layout
            [ width (Element.px (toFloat model.screenDimensions.w * 0.9 |> floor))
            , Font.family [ Font.typeface "Helvetica Neue", Font.sansSerif ]
            , Element.paddingEach { top = 40, left = 15, bottom = 25, right = 15 }
            ]
            (Element.column [ width fill ]
                [ viewNav model.view, body ]
            )
        ]
    }



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


viewResearchResults : List RC.Portal -> List KeywordString -> Bool -> Form.Model -> ScreenDimensions -> SearchViewState -> List Research -> Element Msg
viewResearchResults allPortals allKeywords submitting searchFormState dimensions sv lst =
    let
        layout =
            sv.layout

        (Page p) =
            sv.page

        sorting =
            sv.sorting

        initialForm =
            sv.form

        sorted : List Research
        sorted =
            lst |> sortResearch sorting |> List.drop ((p - 1) * pageSize) |> List.take pageSize

        render : Element Msg
        render =
            case layout of
                ListLayout ->
                    makeColumns 2 [] (sorted |> List.map viewResearchMicro)

                ScreenLayout scale ->
                    viewScreenshots dimensions sv scale sorted

        urlFromLayout : SearchViewState -> Layout -> String
        urlFromLayout st layou =
            SearchView { st | layout = layou } |> appUrlFromView

        urlFromSorting : SearchViewState -> RC.TitleSorting -> String
        urlFromSorting st s =
            SearchView { st | sorting = s } |> appUrlFromView

        numberOfPages : Int
        numberOfPages =
            lst |> List.length |> (\n -> n // pageSize)
    in
    Element.column [ anchor "top", spacingXY 0 5, width fill ] <|
        [ Element.el [ paddingXY 0 15 ]
            (viewSearch (Just initialForm) allPortals allKeywords submitting searchFormState)
        , Element.row
            [ width fill ]
            [ Element.el [ Element.alignLeft ] <| viewLayoutSwitch layout (urlFromLayout sv)
            , Element.el [ Element.alignRight ] <| toggleTitleSorting sorting (urlFromSorting sv)
            ]
        , render
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
    Element.row
        [ Element.spacing 5
        , Element.padding 5
        , Element.Border.solid
        , Element.Border.color (rgb255 144 144 144)
        , Element.Border.width 1
        , Element.Background.color (rgb255 250 250 250)
        , Element.clipX
        , width fill
        ]
        [ Element.link [] { url = AppUrl.fromPath [ "research", "search", "list" ] |> withParameter ( "keyword", name ) |> AppUrl.toString |> prefixHash, label = Element.paragraph [ Element.centerX, Font.size fontsize ] <| [ Element.el [ width fill ] <| Element.text name ] }
        , Element.el [ width (px 25), Element.alignRight, Font.size fontsize ] (Element.text (count |> String.fromInt))
        ]


viewKeywordAsClickable : Int -> RC.Keyword -> Element Msg
viewKeywordAsClickable fontsize kw =
    let
        name : String
        name =
            RC.kwName kw |> String.toLower

        count : Int
        count =
            RC.getCount kw
    in
    Element.row
        [ Element.spacing 5
        , Element.padding 5
        , Element.Border.solid
        , Element.Border.color (rgb255 144 144 144)
        , Element.Border.width 1
        , Element.Background.color (rgb255 250 250 250)
        , Element.clipX

        -- Element.Border.shadow { size = 4, offset =  (5,5), blur = 8, color = (rgb 0.7 0.7 0.7) }
        , width fill
        ]
        --[ Element.link [] { url = AppUrl.fromPath [ "research", "search", "list" ] |> withParameter ( "keyword", name ) |> AppUrl.toString |> prefixHash, label = Element.paragraph [ Element.centerX, Font.size fontsize ] <| [ Element.el [ width fill ] <| Element.text name ] }
        [ Element.Input.button [ width fill ]
            { onPress = Just (AddKeyword name)
            , label = Element.paragraph [ Element.centerX, Font.size fontsize ] <| [ Element.el [ width fill ] <| Element.text name ]
            }
        , Element.el [ width (px 25), Element.alignRight, Font.size fontsize ] (Element.text (count |> String.fromInt))
        ]


viewSelectedKeyword : Int -> String -> Element Msg
viewSelectedKeyword fontsize kw =
    let
        name : String
        name =
            kw

        count : Int
        count =
            0
    in
    Element.row
        [ Element.spacing 5
        , Element.padding 5
        , Element.Border.solid
        , Element.Border.color (rgb255 144 144 144)
        , Element.Border.width 1
        , Element.Background.color (rgb255 250 250 250)
        , Element.clipX

        -- Element.Border.shadow { size = 4, offset =  (5,5), blur = 8, color = (rgb 0.7 0.7 0.7) }
        , width (fill |> maximum 200)
        ]
        --[ Element.link [] { url = AppUrl.fromPath [ "research", "search", "list" ] |> withParameter ( "keyword", name ) |> AppUrl.toString |> prefixHash, label = Element.paragraph [ Element.centerX, Font.size fontsize ] <| [ Element.el [ width fill ] <| Element.text name ] }
        [ Element.Input.button [ Element.alignRight, Font.size fontsize ]
            { onPress = Just (RemoveKeyword name)
            , label = text "x"
            }
        , Element.Input.button [ width fill ]
            { onPress = Just (RemoveKeyword name)
            , label = Element.paragraph [ Element.centerX, Font.size fontsize ] <| [ Element.el [ width fill ] <| Element.text name ]
            }

        --Element.el [ width (px 25), Element.alignRight, Font.size fontsize ] (Element.text "x")
        ]


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
                            ]
    in
    appurl |> AppUrl.toString |> prefixHash


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
                    [ "results ", (p - 1) * pageSize |> String.fromInt, "-", min ((p + 1) * pageSize) count |> String.fromInt, " (total: ", count |> String.fromInt, ")" ] |> String.concat
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
                [ Element.Input.search [ Element.Border.rounded 0, width (px 200), height (px 40), onEnter HitEnter ]
                    { onChange = ChangedQuery
                    , text = model.query
                    , placeholder = Just (Element.Input.placeholder [ Font.size 16 ] (Element.text "search for keyword"))
                    , label = Element.Input.labelAbove [ Font.size 16 ] (Element.text "keyword")
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
                        Element.column [ Element.width (px (floor (toFloat model.screenDimensions.w * 0.9))), Element.spacing 15 ]
                            [ Element.el [ width shrink, Element.paddingXY 0 5 ] (toggleSorting sorting)
                            , viewCount results
                            , currentPage |> List.map (viewKeywordAsButton 16) |> makeColumns 4 [ width fill, spacingXY 25 25 ]
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


makeColumns : Int -> List (Element.Attribute Msg) -> List (Element Msg) -> Element Msg
makeColumns n attrs lst =
    Element.column attrs
        (lst
            |> makeNumColumns n
            |> List.map (\rowItems -> Element.row [ width fill, spacing 25 ] rowItems)
        )


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


notInSet : Model -> RC.Keyword -> Bool
notInSet model kw =
    let
        name : String
        name =
            RC.kwName kw

        set =
            Set.toList model.keywords
    in
    if List.member name set then
        False

    else
        True


lazyImageWithErrorHandling : Int -> ScreenDimensions -> Research -> Html Msg
lazyImageWithErrorHandling groupSize dimensions research =
    let
        urlFromId : Int -> String
        urlFromId i =
            String.fromInt i |> (\fileName -> "/screenshots/" ++ fileName ++ ".jpeg")

        width : String
        width =
            (((dimensions.w - 180) // groupSize) |> String.fromInt) ++ "px"

        height : String
        height =
            (dimensions.h // (groupSize - 1) |> String.fromInt) ++ "px"
    in
    Html.a [ Attr.target "_blank", Attr.href research.defaultPage, Attr.title (RC.getName research.author ++ " - " ++ research.title ++ " - " ++ research.created) ]
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


sortResearch : RC.TitleSorting -> List Research -> List Research
sortResearch sorting research =
    case sorting of
        RC.OldestFirst ->
            research |> List.sortBy (\r -> r.created)

        RC.Random ->
            research |> RC.shuffleWithSeed 42

        RC.NewestFirst ->
            research |> List.sortBy (\r -> r.created) |> List.reverse


viewScreenshots : ScreenDimensions -> SearchViewState -> Scale -> List Research -> Element Msg
viewScreenshots screenDimensions sv scale research =
    let
        groupSize : Int
        groupSize =
            scaleToGroupSize scale

        groups : List (List Research)
        groups =
            research |> splitGroupsOf groupSize

        viewGroup : List Research -> Html Msg
        viewGroup group =
            Html.div [ Attr.style "display" "flex" ] (List.map (\exp -> lazyImageWithErrorHandling groupSize screenDimensions exp) group)

        urlWithScale screenScale =
            appUrlFromSearchViewState { sv | layout = ScreenLayout screenScale }
    in
    Element.column [ Element.paddingEach { paddingEachZero | top = 15 }, width fill ]
        [ Element.el [ Element.alignRight, Element.paddingEach { paddingEachZero | bottom = 15 } ] (viewScaleSwitch scale urlWithScale)
        , Element.html (Html.div [] (List.map viewGroup groups))
        ]


paddingEachZero : { top : Int, left : Int, right : Int, bottom : Int }
paddingEachZero =
    { top = 0, left = 0, right = 0, bottom = 0 }



-- Html.div
--     []
--     [ Html.h1 [] [ Html.text "Visual" ]
--     , Html.br [] []
--     , Html.div []
--         (List.map viewGroup groups)
--     ]
-- this function creates a dictionary of all keywords and the research that have them


makeNumColumns : Int -> List a -> List (List a)
makeNumColumns num input =
    let
        f : Int -> List a -> List (List a) -> List (List a)
        f n inp acc =
            case inp of
                [] ->
                    acc

                x :: xs ->
                    List.take num (x :: xs) :: f n (List.drop n (x :: xs)) acc
    in
    f num input []


type alias SearchForm =
    { title : String
    , author : String
    , keywords : List String
    , portal : String
    }


emptyForm : SearchForm
emptyForm =
    { title = ""
    , author = ""
    , keywords = []
    , portal = ""
    }


formWith : String -> String -> List String -> String -> SearchForm
formWith title author keywords portal =
    { title = title
    , author = author
    , keywords = keywords
    , portal = portal
    }


searchForm : Maybe String -> Maybe String -> Maybe String -> Maybe String -> Maybe String -> SearchForm
searchForm title author keyword1 keyword2 portal =
    let
        nothingIsJustEmpty =
            Maybe.withDefault ""
    in
    SearchForm
        (nothingIsJustEmpty title)
        (nothingIsJustEmpty author)
        (List.filterMap identity [ keyword1, keyword2 ])
        (nothingIsJustEmpty portal)


quote str =
    "\"" ++ str ++ "\""


searchGUI portals keywords =
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
                        Err (quote k ++ " not used in RC")

        portalsAsOptions =
            ( "", "" ) :: (portals |> List.map (\p -> ( p.name, p.name )))
    in
    Form.form
        (\title author keyword1 keyword2 portal ->
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
            , view =
                \info ->
                    [ Html.div []
                        [ Html.h1 headerStyle [ Html.text "search:" ]
                        , Html.label []
                            [ Html.div [ Attr.style "display" "flex" ]
                                [ fieldView info "title" title
                                , fieldView info "author" author
                                ]
                            , Html.div [ Attr.style "display" "flex" ]
                                [ keywordField keywords info "keywords" keyword1
                                , keywordField keywords info "" keyword2
                                ]
                            ]
                        , FieldView.select dropdownStyle
                            (\entry -> ( [], entry ))
                            portal
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
        |> Form.field "portal" (Field.select portalsAsOptions (\_ -> "Error !!!") |> Field.withInitialValue .portal)


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
    [ Attr.style "padding" "5px"
    , Attr.style "margin" "15px 5px"
    , Attr.style "border" "1px solid gray"
    , Attr.style "display" "block"
    , Attr.style "max-width" "400px"
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
    , Attr.style "float" "right"
    ]


toggleLabelStyle : List (Element.Attr decorative msg)
toggleLabelStyle =
    [ Font.size 12, Font.color black ]


fieldView formState label field =
    Html.div []
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
    Html.div []
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
    Html.div []
        [ Html.label labelStyle
            [ Html.text (label ++ " ")
            , field |> FieldView.input ([ Attr.list "keyword-field" ] ++ fieldStyle)
            , Html.datalist [ Attr.id "keyword-field", Attr.autocomplete False ]
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



-- portalField allPortals formState label field =
--     let
--         allPortalStrings : List String
--         allPortalStrings =
--             List.map .name allPortals
--     in
--     Html.div []
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


viewSearch : Maybe SearchForm -> List RC.Portal -> List KeywordString -> Bool -> Form.Model -> Element Msg
viewSearch initialForm portals keywords submitting searchFormState =
    case initialForm of
        Just formInput ->
            Element.el
                [ paddingXY 15 15
                , Element.Border.solid
                , Element.Border.color black
                , Element.Border.width 1
                ]
            <|
                Element.html
                    (searchGUI portals keywords
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
