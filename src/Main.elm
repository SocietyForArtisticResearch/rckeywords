module Main exposing (..)

import Browser
import Dict exposing (Dict)
import Html exposing (Html)
import Html.Attributes as Attr
import Html.Events as Events
import Http
import Json.Decode exposing (Decoder, field, int, maybe, string)
import Json.Decode.Extra as JDE
import Set


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
    | ChangedQuery String


init : () -> ( Model, Cmd Msg )
init _ =
    ( { research = [], query = "" }
    , Http.get { url = "research.json", expect = Http.expectJson GotResearch decodeResearch }
    )


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
    lst |> List.filter (\(Keyword kw) -> String.contains query kw.name)


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


update msg model =
    case msg of
        GotResearch result ->
            case result of
                Ok lst ->
                    ( { model | research = lst }, Cmd.none )

                Err err ->
                    let
                        _ =
                            Debug.log "whoops, error: " err
                    in
                    ( { model | research = [] }, Cmd.none )

        ChangedQuery q ->
            ({model | query = q }, Cmd.none)


view : Model -> Html Msg
view { research, query } =
    let
        researchLst = research 
        viewTitle r =
            Html.p [] [ Html.text r.title ]

        viewKeyword (Keyword kw) =
            let
                pixels =
                    if kw.count > 12 then
                        20

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
    in
    Html.div
        [ Attr.style "font-family" "monospace"
        ]
        [ Html.p [] [ Html.text "This was generated on February 2nd, 2022." ]
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
    }


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
        )


searchLink : String -> String
searchLink term =
    "https://www.researchcatalogue.net/portal/search-result?fulltext=&title=&autocomplete=&keyword=" ++ term ++ "&portal=&statusprogress=0&statuspublished=0&includelimited=0&includeprivate=0&type_research=research&resulttype=research&format=html&limit=25&page=0" |> String.replace " " "%20"
