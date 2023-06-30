module Main exposing (..)

import AppUrl exposing (AppUrl)
import Browser
import Browser.Navigation as Nav
import Dict exposing (Dict)
import Element exposing (Element, el, fill, fillPortion, height, link, padding, paddingXY, px, rgb, rgb255, shrink, spacing, spacingXY, text, width)
import Element.Background
import Element.Border
import Element.Events
import Element.Font as Font
import Element.Input
import Element.Region
import Force exposing (links)
import Html exposing (Html, a, p, s)
import Html.Attributes as Attr exposing (default, style)
import Html.Events as Events
import Http
import Iso8601
import Json.Decode exposing (Decoder, field, int, maybe, string)
import Json.Decode.Extra as JDE
import Json.Encode as JE
import List exposing (reverse)
import List.Extra
import Maybe.Extra exposing (values)
import RCStyles
import Random
import Random.List exposing (shuffle)
import Set exposing (Set)
import String exposing (split)
import Time
import Url exposing (Url)



-- TODO:
-- move sorting to main model, since it also applies to list.


type alias ExpositionID =
    Int


ofString : String -> Maybe ExpositionID
ofString x =
    String.toInt x


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
    Sub.none


type KeywordSorting
    = ByUse
    | Alphabetical
    | RandomKeyword


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


type ListViewState
    = ListViewMain
    | ListViewDetail ExpositionID


type
    View
    -- Routes
    = KeywordsView KeywordsViewState
    | ListView ListViewState
    | ScreenView Scale


type KeywordsViewState
    = KeywordMainView
    | KeywordDetail Keyword -- could be opaque type?


type alias Model =
    { research : List Research
    , reverseKeywordDict : Dict String (List Research) -- keys are Keywords, values are a list of Expositions that have that
    , keywords : KeywordSet

    --, keywordLst : List Keyword
    , keywordSorting : KeywordSorting
    , query : String
    , screenDimensions : { w : Int, h : Int }
    , view : View
    , numberOfResults : Int
    , researchSorting : ScreenOrder -- stored in model, since maybe we want to remember?
    , key : Nav.Key
    , url : AppUrl
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
    | ShowResearchDetail ExpositionID
    | UrlChanged Url.Url
    | LinkClicked Browser.UrlRequest


type alias Flags =
    { width : Int
    , height : Int
    }


init : Flags -> Url -> Nav.Key -> ( Model, Cmd Msg )
init { width, height } url key =
    let
        initUrl =
            urlWhereFragmentIsPath url

        _ =
            Debug.log "url" initUrl
    in
    ( { research = []
      , reverseKeywordDict = Dict.empty
      , keywords = emptyKeywordSet
      , keywordSorting = RandomKeyword
      , query = ""
      , screenDimensions = { w = width, h = height }
      , view = KeywordsView KeywordMainView
      , numberOfResults = 8
      , researchSorting = Random
      , url = initUrl
      , key = key
      }
        |> handleUrl initUrl
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


totalNumber : KeywordSet -> Int
totalNumber (KeywordSet dict) =
    dict |> Dict.keys |> List.length


type KeywordSet
    = KeywordSet (Dict String Keyword)


find : String -> KeywordSet -> Maybe Keyword
find keywordStr (KeywordSet dict) =
    Dict.get keywordStr dict


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


shuffleWithSeed : Int -> List a -> List a
shuffleWithSeed seed lst =
    Random.initialSeed seed
        |> Random.step (shuffle lst)
        |> Tuple.first


listWithSorting : KeywordSorting -> KeywordSet -> List Keyword
listWithSorting sorting kwset =
    let
        lst =
            kwset |> toList
    in
    case sorting of
        ByUse ->
            lst |> List.sortBy getCount

        Alphabetical ->
            lst |> List.sortBy kwName

        RandomKeyword ->
            lst |> shuffleWithSeed 42


titles : List Research -> List Title
titles =
    List.map (.title >> Title)


defaultPadding : Element.Attribute Msg
defaultPadding =
    Element.paddingXY 25 5


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotResearch result ->
            case result of
                Ok lst ->
                    let
                        reverseDict =
                            reverseKeywordDict lst

                        ks =
                            keywordSet lst
                    in
                    ( { model
                        | research = []
                        , reverseKeywordDict = reverseDict
                        , keywords = ks
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

        Randomized lst ->
            ( { model | research = lst }, Cmd.none )

        SetSorting sort ->
            case sort of
                "ByUse" ->
                    ( { model | keywordSorting = ByUse }, Cmd.none )

                "Alphabetical" ->
                    ( { model | keywordSorting = Alphabetical }, Cmd.none )

                "Random" ->
                    ( { model | keywordSorting = RandomKeyword }, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        SwitchView str ->
            let
                v =
                    case str of
                        "keywords" ->
                            KeywordsView KeywordMainView

                        "list" ->
                            ListView ListViewMain

                        "screenshots" ->
                            ScreenView Medium

                        _ ->
                            ListView ListViewMain
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
                    ( { model | researchSorting = Random }, Cmd.none )

                "oldest" ->
                    let
                        fsort r =
                            r.created |> String.split "/" |> List.reverse |> String.join "/"
                    in
                    ( { model
                        | researchSorting = OldestFirst
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
                      }
                    , Cmd.none
                    )

                _ ->
                    ( { model | researchSorting = Random }, Cmd.none )

        ChangeScale str ->
            case str of
                "micro" ->
                    ( { model | view = ScreenView Micro }, Nav.pushUrl model.key "/screenshots?zoom=micro" )

                "small" ->
                    ( { model | view = ScreenView Small }, Nav.pushUrl model.key "/screenshots?zoom=small" )

                "medium" ->
                    ( { model | view = ScreenView Medium }, Nav.pushUrl model.key "/screenshots?zoom=medium" )

                "large" ->
                    ( { model | view = ScreenView Large }, Nav.pushUrl model.key "/screenshots?zoom=large" )

                _ ->
                    ( model, Cmd.none )

        ShowResearchDetail exp ->
            ( { model | view = ListView (ListViewDetail exp) }, Cmd.none )

        UrlChanged url ->
            ( { model | url = url |> urlWhereFragmentIsPath }, Cmd.none )

        LinkClicked urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    ( handleUrl (url |> urlWhereFragmentIsPath) model
                    , Nav.pushUrl model.key (Url.toString url)
                    )

                Browser.External url ->
                    ( model
                    , Nav.load url
                    )


urlWhereFragmentIsPath : Url -> AppUrl.AppUrl
urlWhereFragmentIsPath url =
    let
        -- stripFirstSlash str =
        --     str
        --         |> String.toList
        --         |> (\s ->
        --             let
        --                 _ = Debug.log "s" s
        --             in
        --                 case s of
        --                     '/' :: rest ->
        --                         rest
        --                     _ ->
        --                         s
        --            )
        --         |> String.fromList
        -- _ = Debug.log "url.fragment" url.fragment
        warnMaybe m =
            case m of
                Nothing ->
                    let
                        _ =
                            Debug.log "warning maybe detected" m
                    in
                    m

                Just something ->
                    Just something
    in
    --url.fragment |> Maybe.withDefault "" |> stripFirstSlash |> Url.fromString |> warnMaybe |> Maybe.withDefault url |> AppUrl.fromUrl
    url |> Url.toString |> String.replace "/#" "" |> Url.fromString |> warnMaybe |> Maybe.withDefault url |> AppUrl.fromUrl


handleUrl : AppUrl.AppUrl -> Model -> Model
handleUrl url model =
    let
        _ =
            Debug.log "app-url" url
    in
    case url.path of
        [ "keywords" ] ->
            { model | view = KeywordsView KeywordMainView }

        [ "keywords", keywordAsString ] ->
            case find keywordAsString model.keywords of
                Just kw ->
                    { model | view = KeywordsView (KeywordDetail kw) }

                Nothing ->
                    { model | view = KeywordsView KeywordMainView }

        [ "screenshots" ] ->
            let
                zoom =
                    case Dict.get "zoom" url.queryParameters of
                        Just [ "micro" ] ->
                            Micro

                        Just [ "small" ] ->
                            Small

                        Just [ "medium" ] ->
                            Medium

                        Just [ "large" ] ->
                            Large

                        _ ->
                            Medium
            in
            { model | view = ScreenView zoom }

        [ "list" ] ->
            let
                q =
                    case Dict.get "q" url.queryParameters of
                        Just [ qstr ] ->
                            qstr

                        _ ->
                            ""

                sorting =
                    case Dict.get "sortby" url.queryParameters of
                        Just [ "random" ] ->
                            Random

                        Just [ "old" ] ->
                            OldestFirst

                        Just [ "new" ] ->
                            NewestFirst

                        Just _ ->
                            NewestFirst

                        Nothing ->
                            Random
            in
            { model
                | view = ListView ListViewMain
                , query = q
                , researchSorting = sorting
            }

        _ ->
            model


image : String -> String -> Element msg
image src description =
    Element.html <|
        Html.node "lazy-image"
            [ Attr.attribute "src" src
            , Attr.alt <| "description"
            , Attr.attribute "width" "100px"
            , Attr.attribute "height" "250px"
            ]
            []



{- }
   urlFromModel : Model -> String
   urlFromModel model =
       let sorting =
           case model.researchSorting of
               Random ->
                   "random"

               OldestFirst ->
                   "oldest"

               NewestFirst ->
                   "newest"
       in
       case model.view of
           ListView ListViewMain ->
               "/#/list" ++ "?sorting=" ++ "random"

           ListView ListViewDetail ->
               "/#/list" ++ "?sorting=" ++ "oldest"

           ScreenView Scale ->
               "/#/screenview" ++

-}


viewResearchMicro : Research -> Element Msg
viewResearchMicro research =
    let
        img src desc =
            Element.link [ width (fillPortion 1) ]
                { url = research.defaultPage
                , label =
                    Element.el
                        [ width (px 200)
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
    case research.thumbnail of
        Just thumb ->
            Element.row
                [ width fill
                , height (px 200)
                , Element.clip
                ]
                [ Maybe.map2 img research.thumbnail (research.abstract |> Maybe.map shortAbstract) |> Maybe.withDefault Element.none
                , Element.column [ width (fillPortion 6), Element.alignTop ] <|
                    [ Element.link [ width fill, Element.alignLeft ] <|
                        { label =
                            Element.paragraph
                                [ Font.family [ Font.typeface "Open Sans", Font.sansSerif ]
                                , Font.color (Element.rgb 0.0 0.1 0.0)
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
                                , Font.size 16
                                , Font.regular
                                , Element.Region.heading 2
                                , padding 5
                                , width fill
                                , Element.htmlAttribute (Attr.attribute "style" "text-transform: unset")
                                ]
                                [ Element.text <| authorAsString research.author ]
                        , url = authorUrl research.author
                        }
                    ]
                ]

        Nothing ->
            Element.none


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
                (List.map viewResearchMicro lst)

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


isScreenview : View -> Bool
isScreenview vw =
    case vw of
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
                            (isScreenview model.view)
                        ]
                        [ Html.text "Screenshots" ]
                    , Html.option [ Attr.value "keywords", Attr.selected (isKeywordView model.view) ] [ Html.text "Keywords" ]
                    , Html.option [ Attr.value "list", Attr.selected (isListView model.view) ] [ Html.text "List" ]
                    ]
        ]


isListView : View -> Bool
isListView v =
    case v of
        ListView _ ->
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


red : Element.Color
red =
    Element.rgb 1.0 0.0 0.0


black : Element.Color
black =
    Element.rgb 0.0 0.0 0.0


blue : Element.Color
blue =
    Element.rgb255 66 135 245


white =
    Element.rgb 1.0 1.0 1.0


linkStyle active =
    let
        common =
            [ Element.Border.solid
            , Element.Border.color black
            , Element.Border.width 2
            , Element.padding 25
            , Element.Background.color white
            , Font.color black
            , Element.mouseOver [ Font.color (Element.rgb 0.5 0.5 0.5) ]
            ]
    in
    if active then
        Font.underline :: common

    else
        common


viewNav : View -> Element Msg
viewNav currentView =
    Element.row [ padding 25, Element.Region.navigation, width fill, spacing 25, Font.color (Element.rgb 0.0 0.0 1.0) ]
        [ Element.link (linkStyle (isKeywordView currentView)) { url = "/#/keywords", label = Element.text "keywords" }
        , Element.link (linkStyle (isScreenview currentView)) { url = "/#/screenshots", label = Element.text "screenshots" }
        , Element.link (linkStyle (isListView currentView)) { url = "/#/list", label = Element.text "list" }
        ]


getExposition : ExpositionID -> Model -> Maybe Research
getExposition id model =
    model.research |> List.filter (\r -> r.id == id) |> List.head


view : Model -> Browser.Document Msg
view model =
    let
        body =
            case model.view of
                ListView ListViewMain ->
                    Element.column [ width fill ]
                        [ Element.row [ Element.spacing 25, defaultPadding ] [ screenViewOrderSwitch model ]
                        , viewList model
                        ]

                ListView (ListViewDetail id) ->
                    case getExposition id model of
                        Nothing ->
                            Element.none

                        Just r ->
                            viewResearch r

                KeywordsView kwtype ->
                    case kwtype of
                        KeywordMainView ->
                            Element.column [ width fill ]
                                [ viewKeywords model
                                ]

                        KeywordDetail k ->
                            viewKeywordDetail k model

                ScreenView scale ->
                    Element.column [ width fill ]
                        [ Element.row [ Element.spacing 25 ] [ screenViewOrderSwitch model, viewScaleSwitch scale ]
                        , Element.html (viewScreenshots scale model)
                        ]
    in
    { title = "Research Catalogue - Screenshot Page"
    , body =
        [ Element.layout
            [ width (Element.px (toFloat model.screenDimensions.w * 0.9 |> floor))
            , Font.family [ Font.typeface "Helvetica Neue", Font.sansSerif ]
            , Element.paddingEach { top = 50, left = 15, bottom = 25, right = 15 }
            ]
            (Element.column [ width fill ]
                [ viewNav model.view, body ]
            )
        ]
    }


toggleSorting : Model -> Html Msg
toggleSorting model =
    Html.select [ Events.onInput SetSorting ]
        [ Html.option [ Attr.value "ByUse", Attr.selected (model.keywordSorting == ByUse) ] [ Html.text "By Use" ]
        , Html.option [ Attr.value "Alphabetical", Attr.selected (model.keywordSorting == Alphabetical) ] [ Html.text "Alphabetical" ]
        , Html.option [ Attr.value "Random", Attr.selected (model.keywordSorting == RandomKeyword) ] [ Html.text "Random" ]
        ]


getKeywordsOfResearch : KeywordSet -> Research -> List Keyword
getKeywordsOfResearch keywordset research =
    research.keywords
        |> List.map (\str -> find str keywordset)
        |> values


viewKeywordDetail : Keyword -> Model -> Element Msg
viewKeywordDetail kw model =
    let
        researchWithKeyword =
            Dict.get (kwName kw) model.reverseKeywordDict |> Maybe.withDefault []

        -- the keywords that research with the same keyword uses:
        relatedKeywords =
            researchWithKeyword
                |> List.concatMap (getKeywordsOfResearch model.keywords)
                |> List.Extra.unique
                |> List.sortBy getCount
                |> List.reverse
    in
    -- generate a simple layout with two columns using Element
    Element.column [ width fill, Element.spacingXY 0 0 ]
        [ Element.row [ Element.spacingXY 25 5, width fill ] [ screenViewOrderSwitch model ]
        , Element.link [] { url = "/keywords", label = Element.text "Back" }
        , Element.column [ Font.size 36, paddingXY 0 25, width fill ] [ Element.text (kwName kw), Element.el [ Font.size 14 ] <| Element.text ((getCount kw |> String.fromInt) ++ " expositions use this keyword") ]
        , Element.el [] (Element.text "related keywords : ")
        , relatedKeywords |> List.take 12 |> List.map (viewKeywordAsButton 15) |> makeColumns 6 [ width fill, spacing 5, Element.paddingXY 0 25, Font.size 9 ]
        , researchWithKeyword |> List.map viewResearch |> makeColumns 3 [ width fill, spacing 25, Element.paddingXY 0 25 ]
        ]


viewKeywordAsButton : Int -> Keyword -> Element Msg
viewKeywordAsButton fontsize (Keyword k) =
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
        , Element.Border.color (rgb255 144 144 144)
        , Element.Border.width 1
        , Element.Background.color (rgb255 250 250 250)
        , Element.clipX

        -- Element.Border.shadow { size = 4, offset =  (5,5), blur = 8, color = (rgb 0.7 0.7 0.7) }
        , width fill
        ]
        [ Element.link [] { url = AppUrl.fromPath [ "keywords", name ] |> AppUrl.toString, label = Element.paragraph [ Element.centerX, Font.size fontsize ] <| [ Element.el [ width fill ] <| Element.text name ] }

        -- [ Element.Input.button [ Font.color (rgb 0.0 0.0 1.0), width fill ]
        --     { onPress = Just (ShowKeyword (Keyword k))
        --     , label = Element.paragraph [ Element.centerX, Font.size fontsize ] <| [ Element.el [ width fill ] <| Element.text name ]
        --     }
        , Element.el [ width (px 25), Element.alignRight, Font.size fontsize ] (Element.text (count |> String.fromInt))
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

        keywordCount =
            let
                count =
                    "there are: " ++ (model.keywords |> totalNumber |> String.fromInt) ++ " keywords."
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

        filtered =
            model.keywords
                |> toList
                |> List.filter (\kw -> String.contains model.query (kwName kw))
    in
    Element.column [ width fill ]
        [ Element.row [ defaultPadding, Element.spacingXY 25 25, width fill ]
            [ Element.el [ width shrink ] lastDate
            , Element.el [ width shrink ] <| Element.html (toggleSorting model)
            , Element.el [ width shrink ] keywordCount
            ]
        , Element.el [ width shrink, defaultPadding ] keywordSearch
        , List.map (viewKeywordAsButton 16) filtered |> makeColumns 4 [ width fill, spacing 25, Element.paddingXY 25 25 ]
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
