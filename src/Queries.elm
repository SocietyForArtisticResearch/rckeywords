module Queries exposing
    ( RankedResult(..)
    , Search(..)
    , SearchQuery(..)
    , SearchResult(..)
    , decodeSearchQuery
    , decodeSearchResult
    , emptySearch
    , encodeSearchQuery
    , encodeSearchResult
    , findExpositionWithId
    , findResearchAfter
    , findResearchBefore
    , findResearchWithAbstract
    , findResearchWithAuthor
    , findResearchWithKeywords
    , findResearchWithPortal
    , findResearchWithTitle
    , getKeywords
    , length
    , searchWithKeywords
    , sortByRank
    , toList
    , unrank
    , withAbstract
    , withAfter
    , withAuthor
    , withBefore
    , withPortal
    , withTitle
    )

import Date exposing (Date)
import Dict
import EnrichedResearch exposing (ResearchWithKeywords)
import Form.Handler exposing (with)
import Fuzzy
import Html exposing (a)
import Iso8601
import Json.Decode as D exposing (field, int, list, map, maybe, string)
import Json.Encode as E
import Research as RC exposing (Research)
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
        , abstract : String
        , after : Maybe Date
        , before : Maybe Date
        , portal : String
        }


type Ranked a
    = Ranked Int a


type RankedResult a
    = RankedResult (List (Ranked a))
    | Unranked (List a)


filterRanked : (a -> Bool) -> RankedResult a -> RankedResult a
filterRanked f ranked =
    case ranked of
        RankedResult lst ->
            RankedResult (lst |> List.filter (\(Ranked _ r) -> f r))

        Unranked lst ->
            Unranked (lst |> List.filter f)


overwriteRank : (a -> Int) -> RankedResult a -> RankedResult a
overwriteRank f ranked =
    case ranked of
        RankedResult lst ->
            RankedResult (lst |> List.map (\(Ranked _ x) -> Ranked (f x) x))

        Unranked lst ->
            lst |> rank f


getRank : Ranked a -> Int
getRank (Ranked score _) =
    score


getValue : Ranked a -> a
getValue (Ranked _ value) =
    value


rank : (a -> Int) -> List a -> RankedResult a
rank f lst =
    List.map (\x -> Ranked (f x) x) lst |> RankedResult


unrank : List a -> RankedResult a
unrank xs =
    Unranked xs


toList : RankedResult a -> List a
toList result =
    case result of
        Unranked xs ->
            xs

        RankedResult xs ->
            xs |> List.map getValue


length : RankedResult a -> Int
length r =
    case r of
        Unranked xs ->
            List.length xs

        RankedResult xs ->
            List.length xs


sortByRank : RankedResult a -> List a
sortByRank result =
    case result of
        Unranked xs ->
            xs

        RankedResult xs ->
            List.sortBy getRank xs |> List.map getValue


withAuthor : String -> Search -> Search
withAuthor author (Search s) =
    Search { s | author = author }


withTitle : String -> Search -> Search
withTitle title (Search s) =
    Search
        { s
            | title = title
        }


withAbstract abstract (Search s) =
    Search
        { s | abstract = abstract }


withPortal : String -> Search -> Search
withPortal portal (Search s) =
    Search
        { s | portal = portal }


withAfter : Maybe Date -> Search -> Search
withAfter mdate (Search s) =
    Search
        { s
            | after = mdate
        }


withBefore : Maybe Date -> Search -> Search
withBefore mdate (Search s) =
    Search
        { s
            | before = mdate
        }


emptySearch : Search
emptySearch =
    Search
        { title = ""
        , author = ""
        , keywords = Set.empty
        , abstract = ""
        , after = Nothing
        , before = Nothing
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


search : String -> String -> Set String -> String -> Maybe Date -> Maybe Date -> String -> Search
search title author keywords abstract after before portal =
    Search
        { title = title
        , author = author
        , keywords = keywords
        , abstract = abstract
        , after = after
        , before = before
        , portal = portal
        }


decodeSearch : D.Decoder Search
decodeSearch =
    D.map7 search
        (field "title" string)
        (field "author" string)
        (field "keywords" (list string) |> map Set.fromList)
        (field "abstract" string)
        (maybe (field "after" int |> map Date.fromRataDie))
        (maybe (field "before" int |> map Date.fromRataDie))
        (field "portal" string)


appendMaybe : Maybe a -> List a -> List a
appendMaybe x xs =
    case x of
        Just some ->
            some :: xs

        Nothing ->
            xs


encodeSearch : Search -> E.Value
encodeSearch (Search data) =
    let
        mafter =
            data.after |> Maybe.map (\after -> ( "after", E.int (Date.toRataDie after) ))

        mbefore =
            data.before |> Maybe.map (\before -> ( "before", E.int (Date.toRataDie before) ))
    in
    E.object
        ([ ( "title", E.string data.title )
         , ( "author", E.string data.author )
         , ( "keywords", E.list E.string (data.keywords |> Set.toList) )
         , ( "abstract", E.string data.abstract )
         , ( "portal", E.string data.portal )
         ]
            |> appendMaybe mafter
            |> appendMaybe mbefore
        )


type SearchQuery
    = FindKeywords String RC.KeywordSorting
    | FindResearch Search
    | GetAllKeywords
    | GetAllPortals
    | GetExposition RC.ExpositionID


type SearchResult
    = Expositions (List (RC.Research ResearchWithKeywords))
    | RankedExpositions (RankedResult ResearchWithKeywords)
    | Keywords (List RC.Keyword)
    | AllKeywords (List RC.Keyword)
    | AllPortals (List RC.Portal)
    | Exposition (Result String ResearchWithKeywords)


decodeSearchResult : D.Decoder SearchResult
decodeSearchResult =
    let
        parseResult typ =
            case typ of
                "expositions" ->
                    D.field "expositions" (D.list EnrichedResearch.decoder |> D.map Expositions)

                "ranked-expositions" ->
                    D.field "expositions" (decodeRanked EnrichedResearch.decoder) |> D.map RankedExpositions

                "keywords" ->
                    D.field "keywords" (D.list RC.decodeKeyword |> D.map Keywords)

                "allkeywords" ->
                    field "keywords" (D.list RC.decodeKeyword |> D.map AllKeywords)

                "allportals" ->
                    field "portals" (D.list RC.decodePortal |> D.map AllPortals)

                "exposition" ->
                    field "exposition" EnrichedResearch.decodeExpositionResult |> D.map Exposition

                _ ->
                    D.fail "expected expositions or keywords"
    in
    field "type" string |> D.andThen parseResult


encodeRanked : (a -> E.Value) -> RankedResult a -> E.Value
encodeRanked encoder result =
    case result of
        RankedResult lst ->
            E.object
                [ ( "rankedResult"
                  , E.list
                        (\(Ranked score value) ->
                            E.object
                                [ ( "score", E.int score )
                                , ( "value", encoder value )
                                ]
                        )
                        lst
                  )
                ]

        Unranked lst ->
            E.object
                [ ( "unranked"
                  , E.list encoder lst
                  )
                ]


decodeRanked : D.Decoder a -> D.Decoder (RankedResult a)
decodeRanked decoder =
    let
        decodeRankedResult =
            D.field "rankedResult"
                (D.list
                    (D.map2 (\score value -> Ranked score value)
                        (D.field "score" D.int)
                        (D.field "value" decoder)
                    )
                    |> D.map RankedResult
                )

        decodeUnranked =
            D.field "unranked"
                (D.list decoder |> D.map Unranked)
    in
    D.oneOf
        [ decodeRankedResult
        , decodeUnranked
        ]


encodeSearchResult : SearchResult -> E.Value
encodeSearchResult result =
    case result of
        Expositions exps ->
            E.object
                [ ( "type", E.string "expositions" )
                , ( "expositions", E.list EnrichedResearch.encodeResearchWithKeywords exps )
                ]

        RankedExpositions exps ->
            E.object
                [ ( "type", E.string "ranked-expositions" )
                , ( "expositions", encodeRanked EnrichedResearch.encodeResearchWithKeywords exps )
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

        Exposition exp ->
            E.object
                [ ( "type", E.string "exposition" )
                , ( "exposition", EnrichedResearch.encodeExpositionResult exp )
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


decodeKeywordSorting : D.Decoder RC.KeywordSorting
decodeKeywordSorting =
    string
        |> D.andThen
            (\s ->
                case s of
                    "ByUse" ->
                        D.succeed RC.ByUse

                    "Random" ->
                        D.succeed RC.RandomKeyword

                    "Alphabetical" ->
                        D.succeed RC.Alphabetical

                    _ ->
                        D.fail "Unknown keyword sorting"
            )


decodeSearchQuery : D.Decoder SearchQuery
decodeSearchQuery =
    field "type" string
        |> D.andThen
            (\t ->
                case t of
                    "FindKeywords" ->
                        D.map2 FindKeywords
                            (field "keywords" string |> D.map String.toLower)
                            (field "sorting" decodeKeywordSorting)

                    "FindResearch" ->
                        D.map FindResearch
                            (field "search" decodeSearch)

                    "GetAllKeywords" ->
                        D.succeed GetAllKeywords

                    "GetAllPortals" ->
                        D.succeed GetAllPortals

                    "GetExposition" ->
                        field "id" int |> D.map (\id -> GetExposition id)

                    _ ->
                        D.fail "Unknown query type"
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

        GetExposition id ->
            E.object
                [ ( "type", E.string "GetExposition" )
                , ( "id", E.int id )
                ]


findResearchWithKeywords : Set String -> Dict.Dict String (List (Research r)) -> RankedResult (Research r) -> RankedResult (Research r)
findResearchWithKeywords kw dict research =
    let
        findKw : String -> List (Research r)
        findKw k =
            k |> String.toLower |> (\s -> Dict.get s dict) |> Maybe.withDefault []

        getId : Research r -> RC.ExpositionID
        getId exp =
            exp.id

        {- for each keyword, return the id's that have it, now take the union of those sets of ids -}
        {- use the ids to fetch the expositions -}
        intersectionOfNonempty : Set comparable -> List (Set comparable) -> List comparable
        intersectionOfNonempty first rest =
            List.foldl Set.union first rest |> Set.toList

        combineResults : List (Set comparable) -> List comparable
        combineResults results =
            case results of
                [] ->
                    []

                x :: xs ->
                    intersectionOfNonempty x xs
    in
    case kw |> Set.toList of
        [] ->
            research

        kws ->
            let
                ids =
                    kws
                        |> List.map (\r -> r |> findKw |> List.map getId |> Set.fromList)
                        |> combineResults

                -- the full set is the mempty of combinatory filters
            in
            research |> filterRanked (\exp -> List.member exp.id ids)



-- debug label x =
--     let
--         _ =
--             Debug.log label x
--     in
--     x


findResearchWithTitle : String -> List (Research r) -> RankedResult (Research r)
findResearchWithTitle q lst =
    let
        frank research =
            if research.title |> String.toLower |> String.contains (String.toLower q) then
                -10

            else
                Fuzzy.match
                    [ Fuzzy.addPenalty 10
                    , Fuzzy.removePenalty 10000
                    , Fuzzy.insertPenalty 5
                    , Fuzzy.movePenalty 50
                    ]
                    []
                    q
                    research.title
                    |> .score

        -- f : Research r -> Bool
        -- f r =
        --     r.title |> String.toLower |> String.contains (String.toLower q)
    in
    case q of
        "" ->
            Unranked lst

        _ ->
            lst
                |> rank frank
                |> (\result ->
                        case result of
                            Unranked ulst ->
                                Unranked ulst

                            RankedResult rlst ->
                                rlst
                                    |> List.filter
                                        (\x -> getRank x |> (\score -> score < 500))
                                    |> RankedResult
                   )


findResearchWithAuthor : String -> RankedResult (Research r) -> RankedResult (Research r)
findResearchWithAuthor qauthor lst =
    let
        f : Research r -> Bool
        f r =
            r.author |> RC.getName |> String.toLower |> String.contains (String.toLower qauthor)
    in
    case qauthor of
        "" ->
            lst

        _ ->
            filterRanked f lst


type Compare
    = Smaller



-- comparePosix : Posix -> Posix -> Compare
-- comparePosix p1 p2 =
--     let
--         ( m1, m2 ) =
--             ( Time.posixToMillis p1, Time.posixToMillis p2 )
--     in
--     if m1 == m2 then
--         Equal
--     else if m1 > m2 then
--         Bigger
--     else
--         Smaller


findResearchAfter : Date -> RankedResult (Research r) -> RankedResult (Research r)
findResearchAfter date lst =
    let
        test research =
            case research.publication of
                Just researchdate ->
                    List.member (Date.compare researchdate date) [ GT, EQ ]

                Nothing ->
                    -- if there is no date it is not included in results
                    False

        isJust m =
            case m of
                Just _ ->
                    True

                Nothing ->
                    False

        -- _ =
        --     Debug.log "is there any research?" (List.any (\r -> isJust r.publication) lst)
    in
    filterRanked test lst


findResearchBefore : Date -> RankedResult (Research r) -> RankedResult (Research r)
findResearchBefore date lst =
    let
        test : Research r -> Bool
        test research =
            case research.publication of
                Just researchdate ->
                    List.member (Date.compare researchdate date) [ LT, EQ ]

                Nothing ->
                    False
    in
    filterRanked test lst


findResearchWithPortal : String -> RankedResult (Research r) -> RankedResult (Research r)
findResearchWithPortal portalq lst =
    -- let
    --     _ =
    --         Debug.log portalq "portalq"
    -- in
    case portalq of
        "" ->
            lst

        nonemptyq ->
            let
                f : Research r -> Bool
                f research =
                    case research.portals of
                        [] ->
                            False

                        somePortals ->
                            let
                                names =
                                    somePortals |> List.map (.name >> String.toLower)
                            in
                            names |> List.any (\p -> p == (nonemptyq |> String.toLower))
            in
            filterRanked f lst



-- maybe the not found error could also by a type?


findExpositionWithId : RC.ExpositionID -> List (Research r) -> Result String (Research r)
findExpositionWithId id lst =
    case lst |> List.filter (\r -> r.id == id) |> List.head of
        Just exp ->
            Ok exp

        Nothing ->
            Err (String.fromInt id ++ " not found")


containsIgnoreCase : String -> String -> Bool
containsIgnoreCase needle haystack =
    String.contains (String.toLower needle) (String.toLower haystack)


findResearchWithAbstract : String -> RankedResult (Research r) -> RankedResult (Research r)
findResearchWithAbstract abstractQ lst =
    lst
        |> filterRanked
            (\r ->
                case r.abstract of
                    Nothing ->
                        False

                    Just "" ->
                        False

                    Just nonEmptyString ->
                        containsIgnoreCase abstractQ nonEmptyString
            )
