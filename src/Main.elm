port module Main exposing (Flags, Model, Msg, SearchAction, View, main)

import AppUrl exposing (AppUrl, QueryParameters)
import Browser
import Browser.Navigation as Nav
import Dict exposing (Dict)
import Element exposing (Element, el, fill, fillPortion, height, padding, paddingXY, px, rgb255, shrink, spacing, spacingXY, text, width)
import Element.Background
import Element.Border
import Element.Font as Font
import Element.Input
import Element.Lazy
import Element.Region
import Html exposing (Html, a)
import Html.Attributes as Attr
import Html.Events
import Http
import Iso8601
import Json.Decode exposing (Decoder)
import Json.Encode
import List
import List.Extra
import Maybe.Extra exposing (values)
import Parser
import Queries exposing (SearchQuery(..))
import RCStyles
import Research as RC exposing (Research, sortingFromString)
import Set
import String
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


type ListViewState
    = ListViewMain RC.TitleSorting


type Page
    = Page Int


type View
    = KeywordsView KeywordsViewState
    | SearchView Layout (List String) RC.TitleSorting Page



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


pageFromInt : Int -> Page
pageFromInt p =
    Page p


type KeywordsViewState
    = KeywordMainView RC.KeywordSorting Page -- query, sorting, page
    | KeywordSearch String RC.KeywordSorting Page
    | KeywordDetail (List RC.Keyword) RC.TitleSorting -- could be opaque type?


nextPage : KeywordsViewState -> KeywordsViewState
nextPage current =
    case current of
        KeywordMainView sorting (Page p) ->
            KeywordMainView sorting (Page (p + 1))

        KeywordSearch q sorting (Page p) ->
            KeywordSearch q sorting (Page (p + 1))

        KeywordDetail kw sorting ->
            KeywordDetail kw sorting


gotoPage : Page -> KeywordsViewState -> KeywordsViewState
gotoPage page current =
    case current of
        KeywordMainView sorting _ ->
            KeywordMainView sorting page

        KeywordSearch q sorting _ ->
            KeywordSearch q sorting page

        KeywordDetail kw sorting ->
            KeywordDetail kw sorting


type SearchAction
    = Idle
    | Searching
    | FoundKeywords (List RC.Keyword)
    | FoundResearch (List RC.Research)


type alias ScreenDimensions =
    { w : Int, h : Int }


type alias Model =
    { research : List Research
    , reverseKeywordDict : Dict String (List Research) -- keys are Keywords, values are a list of Expositions that have that
    , keywords : RC.KeywordSet
    , query : String
    , search : SearchAction
    , screenDimensions : { w : Int, h : Int }
    , view : View
    , numberOfResults : Int
    , key : Nav.Key
    , url : AppUrl
    }


type Msg
    = GotResearch (Result Http.Error (List Research))
    | ChangedQuery String
    | LoadMore
    | UrlChanged Url.Url
    | LinkClicked Browser.UrlRequest
    | ReceiveResults Json.Decode.Value
    | HitEnter


type alias Flags =
    { width : Int
    , height : Int
    }


init : Flags -> Url -> Nav.Key -> ( Model, Cmd Msg )
init { width, height } url key =
    let
        initUrl : AppUrl
        initUrl =
            urlWhereFragmentIsPath url

        ( model, cmd ) =
            { research = []
            , reverseKeywordDict = Dict.empty
            , keywords = RC.emptyKeywordSet
            , query = ""
            , search = Idle
            , screenDimensions = { w = width, h = height }
            , view = SearchView ListLayout [] RC.Random (Page 0)
            , numberOfResults = 8
            , url = initUrl
            , key = key
            }
                |> handleUrl initUrl
    in
    ( model
    , Cmd.batch
        [ Http.get { url = "internal_research.json", expect = Http.expectJson GotResearch decodeResearch }
        , cmd
        ]
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotResearch result ->
            case result of
                Ok lst ->
                    let
                        reverseDict : Dict String (List Research)
                        reverseDict =
                            reverseKeywordDict lst

                        ks : RC.KeywordSet
                        ks =
                            RC.keywordSet lst
                    in
                    ( { model
                        | research = lst
                        , reverseKeywordDict = reverseDict
                        , keywords = ks
                      }
                    , Cmd.none
                    )

                Err _ ->
                    ( { model | research = [] }, Cmd.none )

        ChangedQuery q ->
            ( { model | query = q }
            , Cmd.none
            )

        LoadMore ->
            ( { model | numberOfResults = model.numberOfResults + 16 }, Cmd.none )

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
                    , Cmd.batch [ cmd, Nav.pushUrl model.key (Url.toString url) ]
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

                Err e ->
                    let
                        _ =
                            Debug.log "error" e
                    in
                    ( model, Cmd.none )

        HitEnter ->
            case model.view of
                KeywordsView (KeywordMainView sorting _) ->
                    ( { model | view = KeywordsView (KeywordMainView sorting (Page 0)) }
                    , Cmd.batch
                        [ sendQuery (Queries.encodeSearchQuery (FindKeywords model.query sorting))
                        , Nav.pushUrl model.key ("/#/keywords/search?q=" ++ model.query ++ "&sorting=" ++ RC.sortingToString sorting)
                        ]
                    )

                KeywordsView (KeywordSearch _ sorting _) ->
                    ( { model | view = KeywordsView (KeywordMainView sorting (Page 0)) }
                    , Cmd.batch
                        [ sendQuery (Queries.encodeSearchQuery (FindKeywords model.query sorting))
                        , Nav.pushUrl model.key ("/#/keywords/search?q=" ++ model.query ++ "&sorting=" ++ RC.sortingToString sorting)
                        ]
                    )

                _ ->
                    ( model, Cmd.none )


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
                    url.queryParameters |> Dict.get "page" |> Maybe.andThen List.head |> Maybe.andThen String.toInt |> Maybe.withDefault 0 |> pageFromInt

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
                sorting =
                    getSortingOfUrl url |> Maybe.withDefault RC.NewestFirst

                keywords =
                    url.queryParameters
                        |> Dict.get "keyword"
                        |> Maybe.withDefault []

                cmd =
                    sendQuery (Queries.encodeSearchQuery (FindResearch keywords))
            in
            ( { model | view = SearchView ListLayout keywords sorting (Page 0) }, cmd )

        [ "research", "search", "screen" ] ->
            let
                sorting =
                    getSortingOfUrl url
                        |> Maybe.withDefault RC.NewestFirst

                keywords =
                    url.queryParameters
                        |> Dict.get "keyword"
                        |> Maybe.withDefault []

                scale =
                    url.queryParameters
                        |> Dict.get "scale"
                        |> Maybe.andThen List.head
                        |> Maybe.andThen scaleFromString
                        |> Maybe.withDefault Medium

                cmd =
                    sendQuery (Queries.encodeSearchQuery (FindResearch keywords))
            in
            ( { model | view = SearchView (ScreenLayout scale) keywords sorting (Page 0) }, cmd )

        _ ->
            noCmd model


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
            Element.none


viewResearch : Research -> Element Msg
viewResearch research =
    let
        ( w, h ) =
            ( 200, 200 )

        img : String -> Element msg
        img src =
            Element.link [ width fill ]
                { url = research.defaultPage
                , label =
                    Element.el
                        [ Element.centerX
                        , width (px w)
                        , height (px h)
                        , Element.paddingXY 0 5
                        ]
                    <|
                        image ( w, h ) src
                }

        short : String
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
        , height fill
        , Element.centerX
        , Element.clip
        ]
        [ Maybe.map img research.thumbnail |> Maybe.withDefault Element.none
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
                    [ Element.text <| RC.authorAsString research.author ]
            , url = RC.authorUrl research.author
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
    lst |> List.concatMap f


shortAbstract : String -> String
shortAbstract abstract =
    let
        splitted : List String
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


listView : RC.TitleSorting -> Model -> Element Msg
listView sorting model =
    let
        filtered : List Research
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

        -- researchInProgress =
        --     List.filter (\r -> r.publicationStatus == InProgress) model.research
        published : List Research
        published =
            List.filter (\r -> r.publicationStatus == RC.Published || r.publicationStatus == RC.InProgress) filtered

        sorted : List Research
        sorted =
            case sorting of
                RC.Random ->
                    RC.shuffleWithSeed 42 published

                RC.NewestFirst ->
                    List.sortBy (\r -> r.created) published |> List.reverse

                RC.OldestFirst ->
                    List.sortBy (\r -> r.created) published

        researchColumn : List Research -> Element Msg
        researchColumn lst =
            Element.column [ Element.spacing 5, Element.alignTop, width fill, Element.paddingXY 5 5 ]
                (List.map viewResearchMicro lst)
    in
    Element.column [ Element.spacingXY 0 25, Element.paddingXY 0 25 ]
        [ Element.row
            []
            [ sorted |> List.take model.numberOfResults |> researchColumn
            , sorted |> List.drop (model.numberOfResults * 2) |> List.take model.numberOfResults |> researchColumn
            , sorted |> List.drop (model.numberOfResults * 3) |> List.take model.numberOfResults |> researchColumn
            ]
        , Element.column [ width fill ]
            [ Element.Input.button
                (Element.centerX :: List.map Element.htmlAttribute RCStyles.rcButtonStyle)
                { onPress = Just LoadMore
                , label = Element.el [ Element.centerX, Font.size 18 ] <| Element.text "LOAD MORE"
                }
            ]
        ]


isKeywordView : View -> Bool
isKeywordView v =
    case v of
        KeywordsView _ ->
            True

        _ ->
            False


screenshotLink : Scale -> RC.TitleSorting -> String
screenshotLink scale sorting =
    { path = [ "visual" ]
    , queryParameters = Dict.fromList [ ( "sorting", List.singleton (RC.titleSortingToString sorting) ), ( "zoom", List.singleton (scaleToString scale) ) ]
    , fragment = Nothing
    }
        |> AppUrl.toString
        |> (\s -> "/#" ++ s)


screenViewOrderSwitch : Scale -> RC.TitleSorting -> Element Msg
screenViewOrderSwitch scale titleSorting =
    let
        withSorting =
            screenshotLink scale
    in
    Element.row [ paddingXY 0 25, width fill, spacing 5, Font.color (Element.rgb 0.0 0.0 1.0) ]
        [ Element.link (linkStyle (titleSorting == RC.Random) SmallLink) { url = withSorting RC.Random, label = Element.text "random" }
        , Element.link (linkStyle (titleSorting == RC.OldestFirst) SmallLink) { url = withSorting RC.OldestFirst, label = Element.text "old first" }
        , Element.link (linkStyle (titleSorting == RC.NewestFirst) SmallLink) { url = withSorting RC.NewestFirst, label = Element.text "new first" }
        ]


listViewOrderSwitch : RC.TitleSorting -> Element Msg
listViewOrderSwitch titleSorting =
    Element.row [ paddingXY 0 25, width fill, spacing 5, Font.color (Element.rgb 0.0 0.0 1.0) ]
        [ Element.link (linkStyle (titleSorting == RC.Random) SmallLink) { url = "/#/list?sorting=random", label = Element.text "random" }
        , Element.link (linkStyle (titleSorting == RC.OldestFirst) SmallLink) { url = "/#/list?sorting=oldestfirst", label = Element.text "old first" }
        , Element.link (linkStyle (titleSorting == RC.NewestFirst) SmallLink) { url = "/#/list?sorting=newestfirst", label = Element.text "new first" }
        ]



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


detailViewOrderSwitch : List RC.Keyword -> RC.TitleSorting -> Element Msg
detailViewOrderSwitch keywords titleSorting =
    let
        sortUrl : RC.TitleSorting -> String
        sortUrl sorting =
            AppUrl.fromPath [ "keywords" ]
                |> withParametersList [ ( "keyword", keywords |> List.map RC.kwName ) ]
                |> withParameter ( "sorting", RC.titleSortingToString sorting )
                |> AppUrl.toString
                |> prefixHash
    in
    Element.row [ paddingXY 0 25, width fill, spacing 5, Font.color (Element.rgb 0.0 0.0 1.0) ]
        [ Element.link (linkStyle (titleSorting == RC.Random) SmallLink) { url = sortUrl RC.Random, label = Element.text "random" }
        , Element.link (linkStyle (titleSorting == RC.OldestFirst) SmallLink) { url = sortUrl RC.OldestFirst, label = Element.text "old first" }
        , Element.link (linkStyle (titleSorting == RC.NewestFirst) SmallLink) { url = sortUrl RC.NewestFirst, label = Element.text "new first" }
        ]


viewScaleSwitch : RC.TitleSorting -> Scale -> Element Msg
viewScaleSwitch titleSorting scale =
    let
        withScale s =
            screenshotLink s titleSorting
    in
    Element.row [ padding 25, width fill, spacing 5, Font.color (Element.rgb 0.0 0.0 1.0) ]
        [ Element.link (linkStyle (scale == Micro) SmallLink) { url = withScale Micro, label = Element.text "micro" }
        , Element.link (linkStyle (scale == Small) SmallLink) { url = withScale Small, label = Element.text "small" }
        , Element.link (linkStyle (scale == Medium) SmallLink) { url = withScale Medium, label = Element.text "medium" }
        , Element.link (linkStyle (scale == Large) SmallLink) { url = withScale Large, label = Element.text "large" }
        ]


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
        Element.Border.dashed :: common


viewNav : View -> Element Msg
viewNav currentView =
    Element.row [ paddingXY 0 5, Element.Region.navigation, width fill, spacing 5, Font.color (Element.rgb 0.0 0.0 1.0) ]
        [ Element.link (linkStyle (isKeywordView currentView) BigLink) { url = "/#/keywords", label = Element.text "keywords" }
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
                    case kwtype of
                        KeywordDetail keywords sorting ->
                            viewKeywordDetail keywords sorting model

                        _ ->
                            viewKeywords model kwtype

                SearchView layout keywords sorting page ->
                    case model.search of
                        FoundResearch lst ->
                            viewResearchResults model.screenDimensions layout model.view lst keywords sorting page

                        _ ->
                            Element.text "search interface"
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
            Page 0


nextPageView : View -> View
nextPageView v =
    gotoPageView (getPageOfView v |> (\(Page p) -> p + 1 |> pageFromInt)) v


pageNav : View -> ScreenDimensions -> List a -> Page -> Element Msg
pageNav v screen lst (Page p) =
    let
        total =
            lst |> List.length |> (\n -> n // pageSize)

        pageLink n =
            Element.link (linkStyle (n == p) SmallLink)
                { url = v |> gotoPageView (Page n) |> appUrlFromView
                , label = Element.text (n |> String.fromInt)
                }

        pageLinks =
            List.range 0 total |> List.map pageLink

        nextLink =
            Element.el []
                (Element.link ([ Element.Background.color (Element.rgb 1.0 0.0 0.0), Element.spacingXY 15 0 ] ++ linkStyle False SmallLink)
                    { url = v |> nextPageView |> appUrlFromView
                    , label = Element.text "next"
                    }
                )
    in
    if total >= p then
        Element.paragraph [ width (px (screen.w * 90 // 100)), Element.spacing 25, Element.paddingXY 0 25 ]
            (pageLinks ++ [ nextLink ])

    else
        Element.none


viewResearchResults : ScreenDimensions -> Layout -> View -> List Research -> List String -> RC.TitleSorting -> Page -> Element Msg
viewResearchResults dimensions layout v lst keywords sorting (Page p) =
    let
        sorted =
            lst |> sortResearch sorting |> List.drop (p * pageSize) |> List.take pageSize

        render =
            case layout of
                ListLayout ->
                    Element.column [] (sorted |> List.map viewResearchMicro)

                ScreenLayout scale ->
                    viewScreenshots dimensions scale sorted
    in
    Element.column [] <|
        Element.el [] (Element.text "research results")
            :: Element.row [] (keywords |> List.map Element.text)
            :: render
            :: [ pageNav v dimensions sorted (Page p) ]


toggleSorting : RC.KeywordSorting -> Element Msg
toggleSorting sorting =
    Element.row [ paddingXY 0 25, Element.Region.navigation, width fill, spacing 5, Font.color (Element.rgb 0.0 0.0 1.0) ]
        [ Element.link (linkStyle (sorting == RC.ByUse) SmallLink) { url = "/#/keywords?sorting=" ++ RC.sortingToString RC.ByUse, label = Element.text "by use" }
        , Element.link (linkStyle (sorting == RC.Alphabetical) SmallLink) { url = "/#/keywords?sorting=" ++ RC.sortingToString RC.Alphabetical, label = Element.text "alphabetical" }
        , Element.link (linkStyle (sorting == RC.RandomKeyword) SmallLink) { url = "/#/keywords?sorting=" ++ RC.sortingToString RC.RandomKeyword, label = Element.text "random" }
        ]


getKeywordsOfResearch : RC.KeywordSet -> Research -> List RC.Keyword
getKeywordsOfResearch keywordset research =
    research.keywords
        |> List.map (\str -> RC.find str keywordset)
        |> values


viewKeywordDetail : List RC.Keyword -> RC.TitleSorting -> Model -> Element Msg
viewKeywordDetail keywords sorting model =
    let
        researchWithKeyword : RC.Keyword -> List Research
        researchWithKeyword kw =
            Dict.get (RC.kwName kw) model.reverseKeywordDict |> Maybe.withDefault []

        union : List RC.Keyword -> List Research
        union kws =
            kws
                |> List.concatMap (\kw -> kw |> researchWithKeyword)

        -- the keywords that research with the same keyword uses:
        relatedKeywords : List Research -> List RC.Keyword
        relatedKeywords expositions =
            expositions
                |> List.concatMap (getKeywordsOfResearch model.keywords)
                |> List.Extra.unique
                |> List.sortBy RC.getCount
                |> List.reverse

        count =
            keywords |> List.map RC.getCount |> List.foldl (+) 0
    in
    -- generate a simple layout with two columns using Element
    Element.column [ width fill, Element.spacingXY 0 0 ]
        [ Element.row [ Element.spacingXY 25 5, width fill ] [ detailViewOrderSwitch keywords sorting ]
        , Element.link [] { url = "/#/keywords", label = Element.text "Back" }
        , Element.column
            [ Font.size 36, paddingXY 0 25, width fill, spacingXY 0 10 ]
            [ Element.text (keywords |> List.map RC.kwName |> String.join ", ")
            , Element.el [ Font.size 14 ] <| Element.text ((count |> String.fromInt) ++ " expositions use this keyword")
            ]
        , Element.el [] (Element.text "related keywords : ")
        , union keywords |> relatedKeywords |> List.take 12 |> List.map (viewKeywordAsButton 15) |> makeColumns 6 [ width fill, spacing 5, Element.paddingXY 0 25, Font.size 9 ]
        , union keywords |> sortResearch sorting |> List.map viewResearch |> makeColumns 3 [ width fill, spacing 25, Element.paddingXY 0 25 ]
        ]


viewKeywordAsButton : Int -> RC.Keyword -> Element Msg
viewKeywordAsButton fontsize kw =
    let
        name : String
        name =
            RC.kwName kw

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


appUrlFromSearchView : List RC.Keyword -> RC.TitleSorting -> String
appUrlFromSearchView keywords titleSorting =
    AppUrl.fromPath [ "search" ]
        |> withParametersList
            [ ( "keywords", keywords |> List.map RC.kwName )
            , ( "sorting", titleSorting |> RC.titleSortingToString |> List.singleton )
            ]
        |> AppUrl.toString
        |> prefixHash


appUrlFromView : View -> String
appUrlFromView v =
    case v of
        KeywordsView kwstate ->
            appUrlFromKeywordViewState kwstate

        SearchView layout keywords sorting page ->
            let
                appurl =
                    case layout of
                        ListLayout ->
                            AppUrl.fromPath [ "research", "search", "list" ]
                                |> withParametersList
                                    [ ( "keyword", keywords )
                                    , ( "sorting", [ RC.titleSortingToString sorting ] )
                                    , ( "page", [ pageAsString page ] )
                                    ]

                        ScreenLayout scale ->
                            AppUrl.fromPath [ "research", "search", "screen" ]
                                |> withParametersList
                                    [ ( "keyword", keywords )
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

                KeywordDetail keywordsLst titleSort ->
                    AppUrl.fromPath [ "keywords" ]
                        |> (\appurl ->
                                { appurl
                                    | queryParameters =
                                        Dict.fromList
                                            [ ( "titleSort", [ RC.titleSortingToString titleSort ] )
                                            , ( "keyword", keywordsLst |> List.map RC.kwName )
                                            ]
                                }
                           )
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

                KeywordDetail _ _ ->
                    Page 0

        sorting =
            case keywordview of
                KeywordMainView s _ ->
                    s

                KeywordSearch _ s _ ->
                    s

                KeywordDetail _ _ ->
                    RC.ByUse

        viewCount : List RC.Keyword -> Element msg
        viewCount lst =
            let
                count : Int
                count =
                    lst |> List.length

                p =
                    page |> pageToInt

                showing =
                    [ "results ", p * pageSize |> String.fromInt, "-", min ((p + 1) * pageSize) count |> String.fromInt, " (total: ", count |> String.fromInt, ")" ] |> String.join ""
            in
            el [ Font.size 12 ] (Element.text showing)

        lastDate : Element msg
        lastDate =
            let
                dateStr : String
                dateStr =
                    findLastDate model.research |> Iso8601.fromTime |> String.split "T" |> List.head |> Maybe.withDefault "?"
            in
            Element.el [ Font.size 12 ] (Element.text ("last updated: " ++ dateStr))

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
                            KeywordMainView RC.ByUse (Page 0) |> appUrlFromKeywordViewState

                        nonEmpty ->
                            KeywordSearch nonEmpty RC.ByUse (Page 0) |> appUrlFromKeywordViewState
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
            if total >= p then
                Element.paragraph [ width (px (model.screenDimensions.w * 90 // 100)), Element.spacing 25, Element.paddingXY 0 25 ]
                    (pageLinks ++ [ nextLink ])

            else
                Element.none

        lazyf : SearchAction -> Element Msg -> Element Msg -> Element Msg
        lazyf result date searchbox =
            Element.column [ width fill, spacingXY 0 15 ]
                [ Element.row [ Element.spacingXY 25 25, width fill ]
                    [ Element.el [ width shrink ] (toggleSorting sorting)
                    , Element.el [ width shrink ] date
                    ]
                , searchbox
                , case result of
                    FoundKeywords results ->
                        let
                            currentPage : List RC.Keyword
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
    Element.Lazy.lazy3
        lazyf
        model.search
        lastDate
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
            i * pageSize
    in
    lst
        |> List.drop start
        |> List.take pageSize


dateFromString : String -> Maybe Time.Posix
dateFromString str =
    let
        result : Result (List Parser.DeadEnd) Time.Posix
        result =
            str |> String.split "/" |> List.reverse |> String.join "-" |> Iso8601.toTime
    in
    case result of
        Ok time ->
            Just time

        Err _ ->
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


decodeResearch : Decoder (List Research)
decodeResearch =
    Json.Decode.list RC.decoder


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


viewScreenshots : ScreenDimensions -> Scale -> List Research -> Element Msg
viewScreenshots screenDimensions scale research =
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
    in
    Element.column []
        [ Element.el [ Element.Region.heading 1 ] <| text "Visual"
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

        addResearchToDict : Research -> Dict String (List Research) -> Dict String (List Research)
        addResearchToDict exp currentDict =
            -- this exposition has keywords k1 k2 k3
            List.foldl (addExpToKeyword exp) currentDict exp.keywords
    in
    List.foldl addResearchToDict Dict.empty research


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
