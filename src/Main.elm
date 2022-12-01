module Main exposing (..)

import Browser
import Dict exposing (Dict)
import Element exposing (Element, fill, fillPortion, height, px, width, paddingXY, padding)
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
import Set
import Time


main : Program () Model Msg
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


type alias Model =
    { research : List Research
    , query : String
    }


type Msg
    = GotResearch (Result Http.Error (List Research))
    | Randomized (List Research)
    | ChangedQuery String


init : () -> ( Model, Cmd Msg )
init _ =
    ( { research = [], query = "" }
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
            { label = Element.paragraph [ Element.Font.family [ Element.Font.typeface "PT Sans" ], Element.Region.heading 1, padding 25,width fill ] [ Element.text research.title ]
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
        chunk =
            case List.length lst // n of
                0 ->
                    1

                x ->
                    x

        auxe l =
            case l of
                [] ->
                    []

                xs ->
                    List.take chunk xs :: auxe (List.drop chunk xs)
    in
    auxe lst


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
                ((Element.text <| String.fromInt <| List.length <| filtered)
                    :: List.map viewResearch lst
                )

        cls =
            splitInColumns 3 filtered

        _ =
            Debug.log "n=" (List.length cls)
    in
    Element.layout [ Element.Font.family [ Element.Font.typeface "Helvetica Neue" ] ] <|
        Element.row [ width fill, height fill ]
            (cls |> List.map researchColumn)


view : Model -> Html Msg
view model =
    viewList model


viewKeywords : Model -> Html Msg
viewKeywords { research, query } =
    let
        researchLst =
            research

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
            researchLst |> keywords |> filter query

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
            , Html.input [ Attr.placeholder "Search for keyword", Attr.value query, Events.onInput ChangedQuery ] []
            , Html.p [] <| List.map viewKeyword keywordLst
            ]

        -- , Html.div []
        --     [ Html.h1 [] [ Html.text "titles" ]
        --     , Html.p [] <| List.map viewTitle researchLst
        --     ]
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


searchLink : String -> String
searchLink term =
    "https://www.researchcatalogue.net/portal/search-result?fulltext=&title=&autocomplete=&keyword=" ++ term ++ "&portal=&statusprogress=0&statuspublished=0&includelimited=0&includeprivate=0&type_research=research&resulttype=research&format=html&limit=25&page=0" |> String.replace " " "%20"
