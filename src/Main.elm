module Main exposing (..)

import Browser
import Dict exposing (Dict)
import Element exposing (Element, fill, height, padding, px, width)
import Element.Font
import Element.Region
import Html exposing (Html)
import Html.Attributes as Attr
import Html.Events as Events
import Http
import Iso8601
import Json.Decode exposing (Decoder, field, int, maybe, string)
import Json.Decode.Extra as JDE
import Json.Encode as JE
import Random
import Random.List exposing (shuffle)
import Time


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


type Sorting
    = ByUse
    | Alphabetical


type View
    = KeywordsView
    | ListView


type alias Model =
    { research : List Research
    , query : String
    , screenDimensions : { w : Int, h : Int }
    , sorting : Sorting
    , view : View
    }


type Msg
    = GotResearch (Result Http.Error (List Research))
    | Randomized (List Research)
    | ChangedQuery String
    | SetSorting String


type alias Flags =
    { width : Int
    , height : Int
    }


init : Flags -> ( Model, Cmd Msg )
init { width, height } =
    ( { research = []
      , query = ""
      , screenDimensions = { w = width, h = height }
      , sorting = ByUse
      , view = KeywordsView
      }
    , Http.get { url = "internal_research.json", expect = Http.expectJson GotResearch decodeResearch }
    )


keywords : List Research -> List Keyword
keywords researchlist =
    List.foldr
        (\research acc ->
            List.foldr insert acc research.keywords
        )
        emptyKeywordSet
        researchlist
        |> toList


type Keyword
    = Keyword { count : Int, name : String }


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


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotResearch result ->
            case result of
                Ok lst ->
                    ( { model | research = [] }, Random.generate Randomized (shuffle lst) )

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
                    ({ model | sorting = ByUse }, Cmd.none)

                "Alphabetical" ->
                    ({ model | sorting = Alphabetical }, Cmd.none)

                _ ->
                    ({ model | sorting = Alphabetical }, Cmd.none)


image : String -> String -> Element msg
image src description =
    Element.html <|
        Html.img
            [ Attr.src src
            , Attr.style "object-fit" "cover"
            , Attr.alt <| description
            , Attr.attribute "width" "100%"
            , Attr.attribute "height" "250px"
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
                    Element.el
                        [ Element.centerX
                        , width fill
                        , Element.height fill
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
                    [ Element.Font.family [ Element.Font.typeface "Open Sans" ]
                    , Element.Font.size 16
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
                    [ Element.Font.family [ Element.Font.typeface "Open Sans" ]
                    , Element.Font.size 12
                    , Element.Font.regular
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
            , Element.Font.size 15
            , Element.Font.light
            , Element.Font.color <| Element.rgb 0.33 0.33 0.33
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
    Element.row []
        [ published |> List.take 16 |> researchColumn
        , published |> List.drop 16 |> List.take 16 |> researchColumn
        , published |> List.drop 32 |> List.take 16 |> researchColumn
        ]


view : Model -> Html Msg
view model =
    Element.layout
        [ width (Element.px model.screenDimensions.w)
        , Element.Font.family [ Element.Font.typeface "Helvetica Neue" ]
        ]
    <|
        case model.view of
            ListView ->
                viewList model

            KeywordsView ->
                Element.html (viewKeywords model)


toggleSorting : Model -> Html Msg
toggleSorting model =
    Html.select [ Events.onInput SetSorting ]
        [ Html.option [ Attr.value "ByUse" ] [ Html.text "By Use" ]
        , Html.option [ Attr.value "Alphabetical" ] [ Html.text "Alphabetical" ]
        ]


viewKeywords : Model -> Html Msg
viewKeywords model =
    let
        researchLst =
            model.research

        viewTitle r =
            Html.p [] [ Html.text r.title ]

        viewKeyword (Keyword kw) =
            let
                pixels =
                    if kw.count > 12 then
                        12 + kw.count

                    else
                        12 + kw.count
            in
            Html.span
                [ Attr.style "font-size" ((pixels |> String.fromInt) ++ "px")
                ]
                [ Html.a
                    [ Attr.href (searchLink kw.name)
                    , Attr.style "display" "inline-block"
                    , Attr.style "padding" "1em"
                    ]
                    [ Html.text kw.name ]
                , Html.span [] [ Html.text <| (kw.count |> String.fromInt) ]
                ]

        keywordLst =
            researchLst |> keywords |> filter model.query

        keywordCount =
            "there are: " ++ (List.length keywordLst |> String.fromInt) ++ " keywords."

        lastDate =
            findLastDate researchLst |> Iso8601.fromTime |> String.split "T" |> List.head |> Maybe.withDefault "?"
    in
    Html.div
        [ Attr.style "font-family" "monospace"
        , Attr.style "padding" "2em"
        ]
        [ Html.p [] [ Html.text ("This was generated on: " ++ lastDate) ]
        , Html.div []
            [ Html.h1 [] [ Html.text "Keywords" ]
            , Html.p [] [ Html.text keywordCount ]
            , Html.input [ Attr.placeholder "Search for keyword", Attr.value model.query, Events.onInput ChangedQuery ] []
            , Html.p [] <| List.map viewKeyword keywordLst
            ]

        -- , Html.div []
        --     [ Html.h1 [] [ Html.text "titles" ]
        --     , Html.p [] <| List.map viewTitle researchLst
        --     ]
        ]


type Author
    = Author { id : Int, name : String }


authorAsString : Author -> String
authorAsString (Author a) =
    a.name


authorUrl : Author -> String
authorUrl (Author a) =
    "https://www.researchcatalogue.net/profile/?person=" ++ String.fromInt a.id


type alias Research =
    { id : Int
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
