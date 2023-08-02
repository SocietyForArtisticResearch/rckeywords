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
import Form.FieldView
import Form.Validation as Validation
import Html exposing (Html)
import Html.Attributes as Attr
import Html.Events
import Iso8601
import Json.Decode
import Json.Encode
import KeywordString exposing (KeywordString)
import List
import Queries exposing (SearchQuery(..))
import RCStyles
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
        [ Element.link (linkStyle (scale == Micro) SmallLink) { url = urlWithScale Micro, label = Element.text "micro" }
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
        [ Element.link (linkStyle (isScreenLayout layout) SmallLink) { url = makeurl (ScreenLayout Medium), label = Element.text "visual" }
        , Element.link (linkStyle (layout == ListLayout) SmallLink) { url = makeurl ListLayout, label = Element.text "list" }
        ]


type Page
    = Page Int


type View
    = KeywordsView KeywordsViewState
    | SearchView Layout SearchForm RC.TitleSorting Page



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
    in
    { query = ""
    , search = Idle
    , screenDimensions = { w = width, h = height }
    , view = SearchView ListLayout emptyForm RC.Random (Page 1)
    , numberOfResults = 8
    , url = initUrl
    , key = key
    , searchPageSize = 20
    , keywords = Set.empty
    , searchGUI = Form.init
    , submitting = False
    , allKeywords = []
    }
        |> handleUrl initUrl
        |> fetchAllKeywords



-- before doing anything else, ask worker for all keywords


fetchAllKeywords : ( Model, Cmd Msg ) -> ( Model, Cmd Msg )
fetchAllKeywords ( model, cmd ) =
    ( model
    , Cmd.batch
        [ sendQuery
            (Queries.encodeSearchQuery Queries.GetAllKeywords)
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
            ( { model | url = url |> urlWhereFragmentIsPath }, Cmd.none )

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

                Err _ ->
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
                        newView =
                            updateViewWithSearch srch model.view

                        searchCmd =
                            sendQuery
                                (Queries.encodeSearchQuery
                                    (FindResearch
                                        (Queries.emptySearch
                                            |> Queries.searchWithKeywords (Set.fromList srch.keywords)
                                            |> Queries.withTitle srch.title
                                            |> Queries.withAuthor srch.author
                                        )
                                    )
                                )
                    in
                    ( { model
                        | view = newView
                        , search = Searching
                      }
                    , Cmd.batch
                        [ searchCmd
                        , Nav.pushUrl model.key (appUrlFromView newView)
                        ]
                    )

                Form.Invalid m x ->
                    ( model, Cmd.none )


updateViewWithSearch : SearchForm -> View -> View
updateViewWithSearch srch v =
    case v of
        KeywordsView s ->
            KeywordsView s

        SearchView layout _ sorting _ ->
            SearchView layout srch sorting (Page 1)


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

                cmd : Cmd msg
                cmd =
                    sendQuery
                        (Queries.encodeSearchQuery
                            (FindResearch
                                (Queries.emptySearch
                                    |> Queries.searchWithKeywords (Set.fromList keywords)
                                    |> Queries.withTitle title
                                    |> Queries.withAuthor author
                                )
                            )
                        )
            in
            ( { model | view = SearchView ListLayout (formWith title author keywords) sorting (Page page) }, cmd )

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

                cmd : Cmd msg
                cmd =
                    sendQuery
                        (Queries.encodeSearchQuery
                            (FindResearch
                                (Queries.emptySearch
                                    |> Queries.searchWithKeywords (Set.fromList keywords)
                                )
                            )
                        )
            in
            ( { model | view = SearchView (ScreenLayout scale) (formWith title author keywords) sorting (Page page) }, cmd )

        _ ->
            ( { model
                | view = SearchView ListLayout (formWith "" "" []) RC.NewestFirst (Page 1)
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



-- listView : RC.TitleSorting -> Model -> Element Msg
-- listView sorting model =
--     let
--         filtered : List Research
--         filtered =
--             List.filter
--                 (\r ->
--                     case r.thumbnail of
--                         Just _ ->
--                             True
--                         Nothing ->
--                             False
--                 )
--                 model.research
--         -- researchInProgress =
--         --     List.filter (\r -> r.publicationStatus == InProgress) model.research
--         published : List Research
--         published =
--             List.filter (\r -> r.publicationStatus == RC.Published || r.publicationStatus == RC.InProgress) filtered
--         sorted : List Research
--         sorted =
--             case sorting of
--                 RC.Random ->
--                     RC.shuffleWithSeed 42 published
--                 RC.NewestFirst ->
--                     List.sortBy (\r -> r.created) published |> List.reverse
--                 RC.OldestFirst ->
--                     List.sortBy (\r -> r.created) published
--         researchColumn : List Research -> Element Msg
--         researchColumn lst =
--             Element.column [ Element.spacing 5, Element.alignTop, width fill, Element.paddingXY 5 5 ]
--                 (List.map viewResearchMicro lst)
--     in
--     Element.column [ Element.spacingXY 0 25, Element.paddingXY 0 25 ]
--         [ Element.row
--             []
--             [ sorted |> List.take model.numberOfResults |> researchColumn
--             , sorted |> List.drop (model.numberOfResults * 2) |> List.take model.numberOfResults |> researchColumn
--             , sorted |> List.drop (model.numberOfResults * 3) |> List.take model.numberOfResults |> researchColumn
--             ]
--         , Element.column [ width fill ]
--             [ Element.Input.button
--                 (Element.centerX :: List.map Element.htmlAttribute RCStyles.rcButtonStyle)
--                 { onPress = Just LoadMore
--                 , label = Element.el [ Element.centerX, Font.size 18 ] <| Element.text "LOAD MORE"
--                 }
--             ]
--         ]


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
                    20

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
        [ Element.link (linkStyle (isKeywordView currentView) BigLink) { url = "/#/keywords", label = Element.text "browse by keyword" }
        , Element.link (linkStyle (isSearchView currentView) BigLink) { url = "/#/research/search/list", label = Element.text "search" }
        ]


isSearchView : View -> Bool
isSearchView v =
    case v of
        SearchView _ _ _ _ ->
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

                SearchView layout keywords sorting page ->
                    case model.search of
                        FoundResearch lst ->
                            let
                                _ =
                                    Debug.log "found research" lst
                            in
                            viewResearchResults model.allKeywords model.submitting model.searchGUI model.screenDimensions layout model.view lst keywords sorting page

                        FoundKeywords _ ->
                            Element.text "hmm, found keywords"

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

        SearchView layout keywords sorting _ ->
            SearchView layout keywords sorting p


getPageOfView : View -> Page
getPageOfView v =
    case v of
        KeywordsView (KeywordMainView _ page) ->
            page

        SearchView _ _ _ page ->
            page

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


viewResearchResults : List KeywordString -> Bool -> Form.Model -> ScreenDimensions -> Layout -> View -> List Research -> SearchForm -> RC.TitleSorting -> Page -> Element Msg
viewResearchResults allKeywords submitting searchFormState dimensions layout v lst initialForm sorting (Page p) =
    let
        sorted : List Research
        sorted =
            lst |> sortResearch sorting |> List.drop ((p - 1) * pageSize) |> List.take pageSize

        render : Element Msg
        render =
            case layout of
                ListLayout ->
                    Element.column [] (sorted |> List.map viewResearchMicro)

                ScreenLayout scale ->
                    viewScreenshots initialForm.keywords dimensions scale sorted

        urlFromLayout : RC.TitleSorting -> Layout -> String
        urlFromLayout s l =
            case l of
                ListLayout ->
                    AppUrl.fromPath [ "research", "search", "list" ]
                        |> withParametersList
                            [ ( "keywords", initialForm.keywords )
                            , ( "sorting", [ RC.titleSortingToString s ] )
                            , ( "page", [ pageAsString (Page p) ] )
                            ]
                        |> AppUrl.toString
                        |> prefixHash

                ScreenLayout scale ->
                    AppUrl.fromPath [ "research", "search", "screen" ]
                        |> withParametersList
                            [ ( "keywords", initialForm.keywords )
                            , ( "sorting", [ RC.titleSortingToString s ] )
                            , ( "scale", [ scaleToString scale ] )
                            , ( "page", [ pageAsString (Page p) ] )
                            ]
                        |> AppUrl.toString
                        |> prefixHash

        urlFromSorting : RC.TitleSorting -> String
        urlFromSorting s =
            urlFromLayout s layout

        numberOfPages : Int
        numberOfPages =
            lst |> List.length |> (\n -> n // pageSize)
    in
    Element.column [ anchor "top", spacingXY 0 5 ] <|
        [ Element.el [] (Element.text "search form")
        , viewSearch (Just initialForm) allKeywords submitting searchFormState
        , viewLayoutSwitch layout (urlFromLayout sorting)
        , toggleTitleSorting sorting urlFromSorting
        , case initialForm.keywords of
            [] ->
                Element.none

            kws ->
                Element.el [] ("showing research for keywords: " ++ (kws |> String.join ",") |> Element.text)
        , render
        , pageNav numberOfPages v dimensions sorted (Page p)
        ]



-- TODO: should construct link in a more global way?


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
        [ Element.link (linkStyle (sorting == RC.Random) SmallLink) { url = sortingToUrl RC.Random, label = Element.text "random" }
        , Element.link (linkStyle (sorting == RC.NewestFirst) SmallLink) { url = sortingToUrl RC.NewestFirst, label = Element.text "newest first" }
        , Element.link (linkStyle (sorting == RC.OldestFirst) SmallLink) { url = sortingToUrl RC.OldestFirst, label = Element.text "oldest first" }
        ]



-- viewKeywordDetail : List RC.Keyword -> RC.TitleSorting -> Model -> Element Msg
-- viewKeywordDetail keywords sorting model =
--     let
--         researchWithKeyword : RC.Keyword -> List Research
--         researchWithKeyword kw =
--             Dict.get (RC.kwName kw) model.reverseKeywordDict |> Maybe.withDefault []
--         union : List RC.Keyword -> List Research
--         union kws =
--             kws
--                 |> List.concatMap (\kw -> kw |> researchWithKeyword)
--         -- the keywords that research with the same keyword uses:
--         relatedKeywords : List Research -> List RC.Keyword
--         relatedKeywords expositions =
--             expositions
--                 |> List.concatMap (getKeywordsOfResearch model.keywords)
--                 |> List.Extra.unique
--                 |> List.sortBy RC.getCount
--                 |> List.reverse
--         count =
--             keywords |> List.map RC.getCount |> List.foldl (+) 0
--     in
--     -- generate a simple layout with two columns using Element
--     Element.column [ width fill, Element.spacingXY 0 0 ]
--         [ Element.row [ Element.spacingXY 25 5, width fill ] [ detailViewOrderSwitch keywords sorting ]
--         , Element.link [] { url = "/#/keywords", label = Element.text "Back" }
--         , Element.column
--             [ Font.size 36, paddingXY 0 25, width fill, spacingXY 0 10 ]
--             [ Element.text (keywords |> List.map RC.kwName |> String.join ", ")
--             , Element.el [ Font.size 14 ] <| Element.text ((count |> String.fromInt) ++ " expositions use this keyword")
--             ]
--         , Element.el [] (Element.text "related keywords : ")
--         , union keywords |> relatedKeywords |> List.take 12 |> List.map (viewKeywordAsButton 15) |> makeColumns 6 [ width fill, spacing 5, Element.paddingXY 0 25, Font.size 9 ]
--         , union keywords |> sortResearch sorting |> List.map viewResearch |> makeColumns 3 [ width fill, spacing 25, Element.paddingXY 0 25 ]
--         ]


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

        -- Element.Border.shadow { size = 4, offset =  (5,5), blur = 8, color = (rgb 0.7 0.7 0.7) }
        , width fill
        ]
        [ Element.link [] { url = AppUrl.fromPath [ "research", "search", "list" ] |> withParameter ( "keyword", name ) |> AppUrl.toString |> prefixHash, label = Element.paragraph [ Element.centerX, Font.size fontsize ] <| [ Element.el [ width fill ] <| Element.text name ] }

        -- [ Element.Input.button [ Font.color (rgb 0.0 0.0 1.0), width fill ]
        --     { onPress = Just (ShowKeyword (Keyword k))
        --     , label = Element.paragraph [ Element.centerX, Font.size fontsize ] <| [ Element.el [ width fill ] <| Element.text name ]
        --     }
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

        SearchView layout searchFormState sorting page ->
            let
                appurl =
                    case layout of
                        ListLayout ->
                            AppUrl.fromPath [ "research", "search", "list" ]
                                |> withParametersList
                                    [ ( "keyword", searchFormState.keywords )
                                    , ( "title", [ searchFormState.title ] )
                                    , ( "author", [ searchFormState.author ] )
                                    , ( "sorting", [ RC.titleSortingToString sorting ] )
                                    , ( "page", [ pageAsString page ] )
                                    ]

                        ScreenLayout scale ->
                            AppUrl.fromPath [ "research", "search", "screen" ]
                                |> withParametersList
                                    [ ( "keyword", searchFormState.keywords )
                                    , ( "title", [ searchFormState.title ] )
                                    , ( "author", [ searchFormState.author ] )
                                    , ( "sorting", [ RC.titleSortingToString sorting ] )
                                    , ( "page", [ pageAsString page ] )
                                    , ( "scale", [ scaleToString scale ] )
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
                [ Element.Input.search [ width (px 200), onEnter HitEnter ]
                    { onChange = ChangedQuery
                    , text = model.query
                    , placeholder = Just (Element.Input.placeholder [] (Element.text "search for keyword"))
                    , label = Element.Input.labelAbove [] (Element.text "keyword")
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
                [ Element.row [ Element.spacingXY 25 25, width fill ]
                    [ Element.el [ width shrink ] (toggleSorting sorting)
                    ]
                , searchbox
                , case result of
                    FoundKeywords results ->
                        let
                            currentPage =
                                pageOfList page results
                        in
                        Element.column [ Element.width (px (floor (toFloat model.screenDimensions.w * 0.9))), Element.spacing 15 ]
                            [ viewCount results
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


viewScreenshots : List String -> ScreenDimensions -> Scale -> List Research -> Element Msg
viewScreenshots keywords screenDimensions scale research =
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

        -- this is currently missing the keyword context
        urlWithScale : Scale -> String
        urlWithScale s =
            AppUrl.fromPath
                [ "research"
                , "search"
                , "screen"
                ]
                |> withParameter ( "scale", scaleToString s )
                |> withParametersList [ ( "keyword", keywords ) ]
                |> AppUrl.toString
                |> prefixHash
    in
    Element.column []
        [ viewScaleSwitch scale urlWithScale
        , Element.el [ Element.Region.heading 1 ] <| text "Visual"
        , Element.html (Html.div [] (List.map viewGroup groups))
        ]



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
    }


emptyForm : SearchForm
emptyForm =
    { title = ""
    , author = ""
    , keywords = []
    }


formWith : String -> String -> List String -> SearchForm
formWith title author keywords =
    { title = title
    , author = author
    , keywords = keywords
    }


searchForm : Maybe String -> Maybe String -> Maybe String -> Maybe String -> SearchForm
searchForm title author keyword1 keyword2 =
    let
        nothingIsJustEmpty =
            Maybe.withDefault ""
    in
    SearchForm
        (nothingIsJustEmpty title)
        (nothingIsJustEmpty author)
        (List.filterMap identity [ keyword1, keyword2 ])


searchGUI keywords =
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
                        Err "this is not a keyword"
    in
    Form.form
        (\title author keyword1 keyword2 ->
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
            , view =
                \info ->
                    [ Html.div []
                        [ Html.label []
                            [ Html.div [ Attr.style "display" "flex" ]
                                [ fieldView info "title" title
                                , fieldView info "author" author
                                ]
                            , Html.div [ Attr.style "display" "flex" ]
                                [ keywordField keywords info "keyword" keyword1
                                , keywordField keywords info "" keyword2
                                ]
                            ]
                        , Html.button []
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


fieldView formState label field =
    Html.div []
        [ Html.label labelStyle
            [ Html.text (label ++ " ")
            , field |> Form.FieldView.input fieldStyle
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


keywordField keywords formState label field =
    let
        lengthIfParsed =
            field
                |> Validation.value
                |> Maybe.map (Maybe.map String.length)

        isLongEnough str =
            case lengthIfParsed of
                Nothing ->
                    True

                Just (Just n) ->
                    (str |> String.length) - 1 >= n

                _ ->
                    False

        kwStrings =
            keywords |> List.map KeywordString.toString

        optimizedSuggestions =
            kwStrings
                |> List.filter isLongEnough
                |> List.sortBy String.length
    in
    Html.div []
        [ Html.label labelStyle
            [ Html.text (label ++ " ")
            , field |> Form.FieldView.input ([ Attr.list "keyword-field" ] ++ fieldStyle)
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


viewSearch : Maybe SearchForm -> List KeywordString -> Bool -> Form.Model -> Element Msg
viewSearch initialForm keywords submitting searchFormState =
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
                    (searchGUI keywords
                        |> Form.renderHtml
                            { submitting = submitting
                            , state = searchFormState
                            , toMsg = FormMsg
                            }
                            (Form.options "signUpForm"
                                |> Form.withOnSubmit (\record -> SubmitSearch record.parsed)
                                |> Form.withInput formInput
                            )
                            []
                    )

        Nothing ->
            Element.text "loading form data.."
