module Main exposing
    ( 
     main
    )

import AppUrl exposing (AppUrl)
import Browser
import Browser.Navigation as Nav
import Dict exposing (Dict)
import Element exposing (Element, el, fill, fillPortion, height, padding, paddingXY, px, rgb255, shrink, spacing, spacingXY, text, width)
import Element.Background
import Element.Border
import Element.Font as Font
import Element.Input
import Element.Region
import Html exposing (Html)
import Html.Attributes as Attr
import Http
import Iso8601
import Json.Decode exposing (Decoder, field, int, maybe, string)
import Json.Decode.Extra as JDE
import List
import List.Extra
import Maybe.Extra exposing (values)
import Parser
import RCStyles
import Random
import Random.List exposing (shuffle)
import String
import Time
import Url exposing (Url)



-- TODO:
-- move sorting to main model, since it also applies to list.


type alias ExpositionID =
    Int


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
    Sub.none


type KeywordSorting
    = ByUse
    | Alphabetical
    | RandomKeyword


type TitleSorting
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


type View
    = KeywordsView KeywordsViewState
    | ListView ListViewState
    | ScreenView Scale TitleSorting


type KeywordsViewState
    = KeywordMainView KeywordSorting
    | KeywordDetail Keyword -- could be opaque type?


type alias Model =
    { research : List Research
    , reverseKeywordDict : Dict String (List Research) -- keys are Keywords, values are a list of Expositions that have that
    , keywords : KeywordSet
    , query : String
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
    in
    ( { research = []
      , reverseKeywordDict = Dict.empty
      , keywords = emptyKeywordSet
      , query = ""
      , screenDimensions = { w = width, h = height }
      , view = KeywordsView (KeywordMainView RandomKeyword)
      , numberOfResults = 8
      , url = initUrl
      , key = key
      }
        |> handleUrl initUrl
    , Http.get { url = "internal_research.json", expect = Http.expectJson GotResearch decodeResearch }
    )


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
    kwSet |> Dict.values


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
        result : Maybe Keyword
        result =
            Dict.get k dict
    in
    case result of
        Just (Keyword kw) ->
            KeywordSet (Dict.insert kw.name (use (Keyword kw)) dict)

        Nothing ->
            KeywordSet (Dict.insert k (newKey k) dict)



-- type Title
--     = Title String


shuffleWithSeed : Int -> List a -> List a
shuffleWithSeed seed lst =
    Random.initialSeed seed
        |> Random.step (shuffle lst)
        |> Tuple.first


sortKeywordLst : KeywordSorting -> List Keyword -> List Keyword
sortKeywordLst sorting lst =
    case sorting of
        ByUse ->
            lst |> List.sortBy getCount |> List.reverse

        Alphabetical ->
            lst |> List.sortBy kwName

        RandomKeyword ->
            lst |> shuffleWithSeed 42


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

                        ks : KeywordSet
                        ks =
                            keywordSet lst
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
            ( { model | query = q }, Cmd.none )

        LoadMore ->
            ( { model | numberOfResults = model.numberOfResults + 16 }, Cmd.none )

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



--We use a fragment, since otherwise the server would have to be configured to serve the same page for all paths


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


sortingFromString : String -> KeywordSorting
sortingFromString str =
    case str of
        "ByUse" ->
            ByUse

        "Alphabetical" ->
            Alphabetical

        "Random" ->
            RandomKeyword

        _ ->
            ByUse


handleUrl : AppUrl.AppUrl -> Model -> Model
handleUrl url model =
    case url.path of
        [ "keywords" ] ->
            let
                sorting : KeywordSorting
                sorting =
                    url.queryParameters |> Dict.get "sorting" |> Maybe.andThen List.head |> Maybe.withDefault "ByUse" |> sortingFromString
            in
            { model | view = KeywordsView (KeywordMainView sorting) }

        [ "keywords", keywordAsString ] ->
            case find keywordAsString model.keywords of
                Just kw ->
                    { model | view = KeywordsView (KeywordDetail kw) }

                Nothing ->
                    { model | view = KeywordsView (KeywordMainView ByUse) }

        [ "screenshots" ] ->
            let
                zoom : Scale
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

                sorting : TitleSorting
                sorting =
                    case Dict.get "sorting" url.queryParameters of
                        Just [ "random" ] ->
                            Random

                        Just [ "oldestfirst" ] ->
                            OldestFirst

                        Just [ "newestfirst" ] ->
                            NewestFirst

                        _ ->
                            Random
            in
            { model | view = ScreenView zoom sorting }

        [ "list" ] ->
            let
                q : String
                q =
                    case Dict.get "q" url.queryParameters of
                        Just [ qstr ] ->
                            qstr

                        _ ->
                            ""
            in
            { model
                | view = ListView ListViewMain
                , query = q
            }

        _ ->
            model


image : String -> Element msg
image src =
    Element.html <|
        Html.node "lazy-image"
            [ Attr.attribute "src" src
            , Attr.alt <| "description"
            , Attr.attribute "width" "100px"
            , Attr.attribute "height" "250px"
            ]
            []


viewResearchMicro : Research -> Element Msg
viewResearchMicro research =
    let
        img : String -> Element msg
        img src =
            Element.link [ width (fillPortion 1) ]
                { url = research.defaultPage
                , label =
                    Element.el
                        [ width (px 200)
                        , height (px 200)
                        , Element.paddingXY 0 5
                        ]
                    <|
                        image src
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
        img : String -> Element msg
        img src =
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
                        image src
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
        , height (px 400)
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


listView : Model -> Element Msg
listView model =
    let
        filtered : List { id : ExpositionID, title : String, keywords : List String, created : String, author : Author, issueId : Maybe Int, publicationStatus : PublicationStatus, publication : Maybe String, abstract : Maybe String, defaultPage : String, thumbnail : Maybe String }
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

        researchColumn : List Research -> Element Msg
        researchColumn lst =
            Element.column [ Element.spacing 5, Element.alignTop, width fill, Element.paddingXY 5 5 ]
                (List.map viewResearchMicro lst)

        -- researchInProgress =
        --     List.filter (\r -> r.publicationStatus == InProgress) model.research
        published : List { id : ExpositionID, title : String, keywords : List String, created : String, author : Author, issueId : Maybe Int, publication : Maybe String, abstract : Maybe String, defaultPage : String, thumbnail : Maybe String, publicationStatus : PublicationStatus }
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
        ScreenView _ _ ->
            True

        _ ->
            False


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


screenViewOrderSwitch : TitleSorting -> Element Msg
screenViewOrderSwitch titleSorting =
    Element.row [ paddingXY 0 25, Element.Region.navigation, width fill, spacing 5, Font.color (Element.rgb 0.0 0.0 1.0) ]
        [ Element.link (linkStyle (titleSorting == Random) SmallLink) { url = "/#/screenshots?sorting=random", label = Element.text "random" }
        , Element.link (linkStyle (titleSorting == OldestFirst) SmallLink) { url = "/#/screenshots?sorting=oldestfirst", label = Element.text "old first" }
        , Element.link (linkStyle (titleSorting == NewestFirst) SmallLink) { url = "/#/screenshots?sorting=newestfirst", label = Element.text "new first" }
        ]


viewScaleSwitch : Scale -> Element Msg
viewScaleSwitch scale =
    Element.row [ padding 25, Element.Region.navigation, width fill, spacing 5, Font.color (Element.rgb 0.0 0.0 1.0) ]
        [ Element.link (linkStyle (scale == Micro) SmallLink) { url = "/#/screenshots?zoom=micro", label = Element.text "micro" }
        , Element.link (linkStyle (scale == Small) SmallLink) { url = "/#/screenshots?zoom=small", label = Element.text "small" }
        , Element.link (linkStyle (scale == Medium) SmallLink) { url = "/#/screenshots?zoom=medium", label = Element.text "medium" }
        , Element.link (linkStyle (scale == Large) SmallLink) { url = "/#/screenshots?zoom=large", label = Element.text "large" }
        ]



-- Element.column [ spacing 10 ]
--     [ text "Zoom:"
--     , el [] <|
--         Element.html <|
--             Html.select [ Events.onInput ChangeScale ]
--                 [ Html.option [ Attr.value "micro", Attr.selected (scale == Micro) ] [ Html.text "Tiny" ]
--                 , Html.option [ Attr.value "small", Attr.selected (scale == Small) ] [ Html.text "Small" ]
--                 , Html.option [ Attr.value "medium", Attr.selected (scale == Medium) ] [ Html.text "Medium" ]
--                 , Html.option [ Attr.value "large", Attr.selected (scale == Large) ] [ Html.text "Large" ]
--                 ]
--     ]


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
        , Element.link (linkStyle (isScreenview currentView) BigLink) { url = "/#/screenshots", label = Element.text "screenshots" }
        , Element.link (linkStyle (isListView currentView) BigLink) { url = "/#/list", label = Element.text "list" }
        ]


view : Model -> Browser.Document Msg
view model =
    let
        body : Element Msg
        body =
            case model.view of
                ListView ListViewMain ->
                    Element.column [ width fill ]
                        [ Element.row [ Element.spacingXY 0 25 ] [ screenViewOrderSwitch Random ]
                        , listView model
                        ]

                KeywordsView kwtype ->
                    case kwtype of
                        KeywordMainView sorting ->
                            Element.column [ width fill ]
                                [ viewKeywords model sorting
                                ]

                        KeywordDetail k ->
                            viewKeywordDetail k model

                ScreenView scale sorting ->
                    Element.column [ width fill ]
                        [ Element.row [ Element.spacing 25 ]
                            [ screenViewOrderSwitch sorting
                            , viewScaleSwitch scale
                            ]
                        , viewScreenshots scale sorting model
                        ]
    in
    { title = "Research Catalogue - Screenshot Page"
    , body =
        [ Element.layout
            [ width (Element.px (toFloat model.screenDimensions.w * 0.9 |> floor))
            , Font.family [ Font.typeface "Helvetica Neue", Font.sansSerif ]
            , Element.paddingEach { top = 10, left = 15, bottom = 25, right = 15 }
            ]
            (Element.column [ width fill ]
                [ viewNav model.view, body ]
            )
        ]
    }



-- toggleSorting : KeywordSorting -> Html Msg
-- toggleSorting sorting =
--     Html.select [ Events.onInput SetSorting ]
--         [ Html.option [ Attr.value "ByUse", Attr.selected (sorting == ByUse) ] [ Html.text "By Use" ]
--         , Html.option [ Attr.value "Alphabetical", Attr.selected (sorting == Alphabetical) ] [ Html.text "Alphabetical" ]
--         , Html.option [ Attr.value "Random", Attr.selected (sorting == RandomKeyword) ] [ Html.text "Random" ]
--         ]


toggleSorting : KeywordSorting -> Element Msg
toggleSorting sorting =
    Element.row [ paddingXY 0 25, Element.Region.navigation, width fill, spacing 5, Font.color (Element.rgb 0.0 0.0 1.0) ]
        [ Element.link (linkStyle (sorting == ByUse) SmallLink) { url = "/#/keywords?sorting=ByUse", label = Element.text "by use" }
        , Element.link (linkStyle (sorting == Alphabetical) SmallLink) { url = "/#/keywords?sorting=Alphabetical", label = Element.text "alphabetical" }
        , Element.link (linkStyle (sorting == RandomKeyword) SmallLink) { url = "/#/keywords?sorting=Random", label = Element.text "random" }
        ]


getKeywordsOfResearch : KeywordSet -> Research -> List Keyword
getKeywordsOfResearch keywordset research =
    research.keywords
        |> List.map (\str -> find str keywordset)
        |> values


viewKeywordDetail : Keyword -> Model -> Element Msg
viewKeywordDetail kw model =
    let
        researchWithKeyword : List Research
        researchWithKeyword =
            Dict.get (kwName kw) model.reverseKeywordDict |> Maybe.withDefault []

        -- the keywords that research with the same keyword uses:
        relatedKeywords : List Keyword
        relatedKeywords =
            researchWithKeyword
                |> List.concatMap (getKeywordsOfResearch model.keywords)
                |> List.Extra.unique
                |> List.sortBy getCount
                |> List.reverse
    in
    -- generate a simple layout with two columns using Element
    Element.column [ width fill, Element.spacingXY 0 0 ]
        [ Element.row [ Element.spacingXY 25 5, width fill ] [ screenViewOrderSwitch NewestFirst ]
        , Element.link [] { url = "/keywords", label = Element.text "Back" }
        , Element.column [ Font.size 36, paddingXY 0 25, width fill ] [ Element.text (kwName kw), Element.el [ Font.size 14 ] <| Element.text ((getCount kw |> String.fromInt) ++ " expositions use this keyword") ]
        , Element.el [] (Element.text "related keywords : ")
        , relatedKeywords |> List.take 12 |> List.map (viewKeywordAsButton 15) |> makeColumns 6 [ width fill, spacing 5, Element.paddingXY 0 25, Font.size 9 ]
        , researchWithKeyword |> List.map viewResearch |> makeColumns 3 [ width fill, spacing 25, Element.paddingXY 0 25 ]
        ]


viewKeywordAsButton : Int -> Keyword -> Element Msg
viewKeywordAsButton fontsize (Keyword k) =
    let
        name : String
        name =
            k.name

        count : Int
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


viewKeywords : Model -> KeywordSorting -> Element Msg
viewKeywords model sorting =
    let
        keywordCount : Element msg
        keywordCount =
            let
                count : String
                count =
                    (model.keywords |> totalNumber |> String.fromInt) ++ " keywords"
            in
            el [ Font.size 12 ] (Element.text count)

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
            Element.Input.search [ width (px 200) ]
                { onChange = ChangedQuery
                , text = model.query
                , placeholder = Just (Element.Input.placeholder [] (Element.text "search for keyword"))
                , label = Element.Input.labelAbove [] (Element.text "search")
                }

        filtered : List Keyword
        filtered =
            model.keywords
                |> toList
                |> List.filter (\kw -> String.contains model.query (kwName kw))

        sorted : List Keyword
        sorted =
            filtered |> sortKeywordLst sorting
    in
    Element.column [ width fill, spacingXY 0 15 ]
        [ Element.row [ Element.spacingXY 25 25, width fill ]
            [ Element.el [ width shrink ] (toggleSorting sorting)
            , Element.el [ width shrink ] keywordCount
            , Element.el [ width shrink ] lastDate
            ]
        , Element.el [ width shrink ] keywordSearch
        , List.map (viewKeywordAsButton 16) sorted |> makeColumns 4 [ width fill, spacingXY 25 25 ] --Element.paddingXY 25 25 ]
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


type PublicationStatus
    = InProgress
    | Published
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
                makeAuthor : Int -> String -> Author
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


getName : Author -> String
getName (Author author) =
    author.name


lazyImageWithErrorHandling : Int -> { w : Int, h : Int } -> Research -> Html Msg
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


sortResearch : TitleSorting -> List Research -> List Research
sortResearch sorting research =
    case sorting of
        OldestFirst ->
            research |> List.sortBy (\r -> r.created)

        Random ->
            research |> List.sortBy (\r -> r.id) |> List.reverse

        NewestFirst ->
            research |> List.sortBy (\r -> r.created) |> List.reverse


viewScreenshots : Scale -> TitleSorting -> Model -> Element Msg
viewScreenshots scale titlesort model =
    let
        groupSize : Int
        groupSize =
            scaleToGroupSize scale

        groups : List (List Research)
        groups =
            model.research |> sortResearch titlesort |> splitGroupsOf groupSize

        viewGroup : List Research -> Html Msg
        viewGroup group =
            Html.div [ Attr.style "display" "flex" ] (List.map (\exp -> lazyImageWithErrorHandling groupSize model.screenDimensions exp) group)
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
