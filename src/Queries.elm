module Queries exposing (..)

import Json.Decode
import Json.Encode
import Research as RC exposing (Keyword)


type SearchQuery
    = FindKeywords String RC.KeywordSorting
    | FindResearch (List RC.Keyword)


type SearchResult
    = Expositions (List RC.Research)
    | Keywords (List RC.Keyword)


decodeSearchResult : Json.Decode.Decoder SearchResult
decodeSearchResult =
    let
        parseResult typ =
            case typ of
                "expositions" ->
                    Json.Decode.field "expositions" (Json.Decode.list RC.decodeExposition |> Json.Decode.map Expositions)

                "keywords" ->
                    Json.Decode.field "keywords" (Json.Decode.list RC.decodeKeyword |> Json.Decode.map Keywords)

                _ ->
                    Json.Decode.fail "expected expositions or keywords"
    in
    Json.Decode.field "type" Json.Decode.string |> Json.Decode.andThen parseResult


encodeSearchResult : SearchResult -> Json.Encode.Value
encodeSearchResult result =
    case result of
        Expositions exps ->
            Json.Encode.object
                [ ( "type", Json.Encode.string "expositions" )
                , ( "expositions", Json.Encode.list RC.encodeExposition exps )
                ]
        
        Keywords kws ->
            Json.Encode.object
            [
                ("type", Json.Encode.string "keywords" )
                , ("keywords", Json.Encode.list RC.encodeKeyword kws)
            ]


encodeKeywordSorting : RC.KeywordSorting -> Json.Encode.Value
encodeKeywordSorting sorting =
    case sorting of
        RC.ByUse ->
            Json.Encode.string "ByUse"

        RC.RandomKeyword ->
            Json.Encode.string "Random"

        RC.Alphabetical ->
            Json.Encode.string "Alphabetical"


decodeKeywordSorting : Json.Decode.Decoder RC.KeywordSorting
decodeKeywordSorting =
    Json.Decode.string
        |> Json.Decode.andThen
            (\s ->
                case s of
                    "ByUse" ->
                        Json.Decode.succeed RC.ByUse

                    "Random" ->
                        Json.Decode.succeed RC.RandomKeyword

                    "Alphabetical" ->
                        Json.Decode.succeed RC.Alphabetical

                    _ ->
                        Json.Decode.fail "Unknown keyword sorting"
            )


decodeSearchQuery : Json.Decode.Decoder SearchQuery
decodeSearchQuery =
    Json.Decode.field "type" Json.Decode.string
        |> Json.Decode.andThen
            (\t ->
                case t of
                    "FindKeywords" ->
                        Json.Decode.map2 FindKeywords
                            (Json.Decode.field "keywords" Json.Decode.string)
                            (Json.Decode.field "sorting" decodeKeywordSorting)

                    "FindResearch" ->
                        Json.Decode.map FindResearch
                            (Json.Decode.field "keywords" (Json.Decode.list RC.decodeKeyword))

                    _ ->
                        Json.Decode.fail "Unknown query type"
            )


encodeSearchQuery : SearchQuery -> Json.Encode.Value
encodeSearchQuery query =
    case query of
        FindKeywords keywords sorting ->
            Json.Encode.object
                [ ( "type", Json.Encode.string "FindKeywords" )
                , ( "keywords", Json.Encode.string keywords )
                , ( "sorting", encodeKeywordSorting sorting )
                ]

        FindResearch keywords ->
            let
                kwStrings =
                    keywords |> List.map RC.kwName
            in
            Json.Encode.object
                [ ( "type", Json.Encode.string "FindResearch" )
                , ( "keywords", Json.Encode.list Json.Encode.string kwStrings )
                ]
