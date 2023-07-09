module Queries exposing (..)

import Json.Decode
import Json.Encode
import Research as RC exposing (Keyword)


type SearchQuery
    = FindKeywords String RC.KeywordSorting


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
