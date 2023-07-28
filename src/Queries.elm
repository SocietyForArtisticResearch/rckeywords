module Queries exposing
    ( Search(..)
    , SearchQuery(..)
    , SearchResult(..)
    , decodeKeywordSorting
    , decodeSearch
    , decodeSearchQuery
    , decodeSearchResult
    , emptySearch
    , encodeKeywordSorting
    , encodeSearch
    , encodeSearchQuery
    , encodeSearchResult
    , getKeywords
    , search
    , searchWithKeywords
    , withAuthor
    , withKeywords
    , withTitle
    )
 
import Json.Decode exposing (field, int, list, map, string)
import Json.Encode as E
import Research as RC
import Set exposing (Set)
import Time
import KeywordString


type Search
    = Search
        { title : String
        , author : String
        , keywords : Set String
        , after : Time.Posix
        , before : Time.Posix
        }


withAuthor : String -> Search -> Search
withAuthor author (Search s) =
    Search { s | author = author }


withKeywords : List String -> Search -> Search
withKeywords keywords (Search s) =
    Search { s | keywords = Set.fromList keywords }


withTitle : String -> Search -> Search
withTitle title (Search s) =
    Search
        { s
            | title = title
        }


emptySearch : Search
emptySearch =
    Search
        { title = ""
        , author = ""
        , keywords = Set.empty
        , after = Time.millisToPosix 0
        , before = Time.millisToPosix ((2 ^ 31) - 1)
        }


getKeywords : Search -> Set String
getKeywords (Search s) =
    s.keywords


searchWithKeywords : Set String -> Search -> Search
searchWithKeywords kws (Search s) =
    Search
        { s
            | keywords = kws
        }


search : String -> String -> Set String -> Time.Posix -> Time.Posix -> Search
search title author keywords after before =
    Search
        { title = title
        , author = author
        , keywords = keywords
        , after = after
        , before = before
        }


decodeSearch : Json.Decode.Decoder Search
decodeSearch =
    Json.Decode.map5 search
        (field "title" string)
        (field "author" string)
        (field "keywords" (list string) |> map Set.fromList)
        (field "after" (int |> map Time.millisToPosix))
        (field "before" (int |> map Time.millisToPosix))


encodeSearch : Search -> E.Value
encodeSearch (Search data) =
    E.object
        [ ( "title", E.string data.title )
        , ( "author", E.string data.author )
        , ( "keywords", E.list E.string (data.keywords |> Set.toList) )
        , ( "after", E.int (Time.posixToMillis data.after) )
        , ( "before", E.int (Time.posixToMillis data.before) )
        ]


type SearchQuery
    = FindKeywords String RC.KeywordSorting
    | FindResearch Search


type SearchResult
    = Expositions (List RC.Research)
    | Keywords (List RC.Keyword)


decodeSearchResult : Json.Decode.Decoder SearchResult
decodeSearchResult =
    let
        parseResult typ =
            case typ of
                "expositions" ->
                    field "expositions" (Json.Decode.list RC.decodeExposition |> Json.Decode.map Expositions)

                "keywords" ->
                    field "keywords" (Json.Decode.list RC.decodeKeyword |> Json.Decode.map Keywords)

                _ ->
                    Json.Decode.fail "expected expositions or keywords"
    in
    field "type" string |> Json.Decode.andThen parseResult


encodeSearchResult : SearchResult -> E.Value
encodeSearchResult result =
    case result of
        Expositions exps ->
            E.object
                [ ( "type", E.string "expositions" )
                , ( "expositions", E.list RC.encodeExposition exps )
                ]

        Keywords kws ->
            E.object
                [ ( "type", E.string "keywords" )
                , ( "keywords", E.list RC.encodeKeyword kws )
                ]


encodeKeywordSorting : RC.KeywordSorting -> E.Value
encodeKeywordSorting sorting =
    case sorting of
        RC.ByUse ->
            E.string "ByUse"

        RC.RandomKeyword ->
            E.string "Random"

        RC.Alphabetical ->
            E.string "Alphabetical"


decodeKeywordSorting : Json.Decode.Decoder RC.KeywordSorting
decodeKeywordSorting =
    string
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
    field "type" string
        |> Json.Decode.andThen
            (\t ->
                case t of
                    "FindKeywords" ->
                        Json.Decode.map2 FindKeywords
                            (field "keywords" string |> Json.Decode.map String.toLower)
                            (field "sorting" decodeKeywordSorting)

                    "FindResearch" ->
                        Json.Decode.map FindResearch
                            (field "search" decodeSearch)

                    _ ->
                        Json.Decode.fail "Unknown query type"
            )


encodeSearchQuery : SearchQuery -> E.Value
encodeSearchQuery query =
    case query of
        FindKeywords keywords sorting ->
            E.object
                [ ( "type", E.string "FindKeywords" )
                , ( "keywords", E.string (String.toLower keywords) ) -- Badly named: this is only a query for searching keywords
                , ( "sorting", encodeKeywordSorting sorting )
                ]

        FindResearch src ->
            E.object
                [ ( "type", E.string "FindResearch" )
                , ( "search", encodeSearch src )
                ]
