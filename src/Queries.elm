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
    , withPortal
    )

import Json.Decode exposing (field, int, list, map, string)
import Json.Encode as E
import KeywordString
import Research as RC
import Set exposing (Set)
import Time



--
-- type Portal
--     = Journal String
--     | Portal String


type Search
    = Search
        { title : String
        , author : String
        , keywords : Set String
        , after : Time.Posix
        , before : Time.Posix
        , portal : String
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


withPortal : String -> Search -> Search
withPortal portal (Search s) =
    Search
        { s | portal = portal }


emptySearch : Search
emptySearch =
    Search
        { title = ""
        , author = ""
        , keywords = Set.empty
        , after = Time.millisToPosix 0
        , before = Time.millisToPosix ((2 ^ 31) - 1)
        , portal = ""
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


search : String -> String -> Set String -> Time.Posix -> Time.Posix -> String -> Search
search title author keywords after before portal =
    Search
        { title = title
        , author = author
        , keywords = keywords
        , after = after
        , before = before
        , portal = portal
        }


decodeSearch : Json.Decode.Decoder Search
decodeSearch =
    Json.Decode.map6 search
        (field "title" string)
        (field "author" string)
        (field "keywords" (list string) |> map Set.fromList)
        (field "after" (int |> map Time.millisToPosix))
        (field "before" (int |> map Time.millisToPosix))
        (field "portal" string)


encodeSearch : Search -> E.Value
encodeSearch (Search data) =
    E.object
        [ ( "title", E.string data.title )
        , ( "author", E.string data.author )
        , ( "keywords", E.list E.string (data.keywords |> Set.toList) )
        , ( "after", E.int (Time.posixToMillis data.after) )
        , ( "before", E.int (Time.posixToMillis data.before) )
        , ( "portal", E.string data.portal )
        ]


type SearchQuery
    = FindKeywords String RC.KeywordSorting
    | FindResearch Search
    | GetAllKeywords
    | GetAllPortals


type SearchResult
    = Expositions (List RC.Research)
    | Keywords (List RC.Keyword)
    | AllKeywords (List RC.Keyword)
    | AllPortals (List RC.Portal)


decodeSearchResult : Json.Decode.Decoder SearchResult
decodeSearchResult =
    let
        parseResult typ =
            case typ of
                "expositions" ->
                    field "expositions" (Json.Decode.list RC.decodeExposition |> Json.Decode.map Expositions)

                "keywords" ->
                    field "keywords" (Json.Decode.list RC.decodeKeyword |> Json.Decode.map Keywords)

                "allkeywords" ->
                    field "keywords" (Json.Decode.list RC.decodeKeyword |> Json.Decode.map AllKeywords)

                "allportals" ->
                    field "portals" (Json.Decode.list RC.decodeWorkerPortal |> Json.Decode.map AllPortals)

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

        AllKeywords kws ->
            E.object
                [ ( "type", E.string "allkeywords" )
                , ( "keywords", E.list RC.encodeKeyword kws )
                ]

        AllPortals portals ->
            E.object
                [ ( "type", E.string "allportals" )
                , ( "portals", E.list RC.encodePortal portals )
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

                    "GetAllKeywords" ->
                        Json.Decode.succeed GetAllKeywords

                    "GetAllPortals" ->
                        Json.Decode.succeed GetAllPortals

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

        GetAllKeywords ->
            E.object
                [ ( "type", E.string "GetAllKeywords" ) ]

        GetAllPortals ->
            E.object
                [ ( "type", E.string "GetAllPortals" ) ]
