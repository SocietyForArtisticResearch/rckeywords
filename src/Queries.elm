module Queries exposing
    ( ExpositionSearch(..)
    , RankedResult(..)
    , Search(..)
    , SearchQuery(..)
    , SearchResult(..)
    , concatRanked
    , decodeSearchQuery
    , decodeSearchResult
    , emptySearch
    , encodeSearchQuery
    , encodeSearchResult
    , filterResearchWithPortal
    , filterResearchWithPortalID
    , findExpositionWithId
    , findResearchAfter
    , findResearchBefore
    , findResearchWithAbstract
    , findResearchWithAuthor
    , findResearchWithKeywords
    , findResearchWithPortal
    , findResearchWithStatus
    , findResearchWithTitle
    , getKeywords
    , length
    , searchWithKeywords
    , sortByRank
    , toList
    , uniqueRankedResult
    , unrank
    , unranked
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
import Json.Decode.Pipeline as JDP
import Json.Encode as E
import List.Extra
import Research as RC exposing (PublicationStatus(..), Research)
import Set exposing (Set)
import String.Normalize
import Time
import Toc exposing (decode)



--
-- type Portal
--     = Journal String
--     | Portal String


type ExpositionSearch
    = Advanced Search
    | QuickSearch String


type Search
    = Search
        { title : String
        , author : String
        , keywords : Set String
        , abstract : String
        , after : Maybe Date
        , before : Maybe Date
        , portal : String
        , publicationStatus : Maybe PublicationStatus
        }


type Ranked a
    = Ranked Int a



-- Ranked score. Higher means more relevant


mapRanked : (a -> b) -> Ranked a -> Ranked b
mapRanked f (Ranked i a) =
    Ranked i (f a)



-- A ranked result is a search result that has an intrensic order.
-- An example can be date, or fuzzy string match.
-- Unranked means that order should be ignored (perhaps it is best to randomize such results?)


type RankedResult a
    = RankedResult (List (Ranked a))
    | Unranked (List a)


uniqueRankedResult : (a -> comparable) -> RankedResult a -> RankedResult a
uniqueRankedResult toComparable rr =
    case rr of
        Unranked lst ->
            Unranked (List.Extra.uniqueBy toComparable lst)

        RankedResult lst ->
            RankedResult (List.Extra.uniqueBy (mapRanked toComparable) lst)


unrank : List (Ranked a) -> List a
unrank rs =
    rs |> List.map (\(Ranked _ x) -> x)


unranked : List a -> RankedResult a
unranked lst =
    Unranked lst


joinRanked : RankedResult a -> RankedResult a -> RankedResult a
joinRanked a b =
    case ( a, b ) of
        ( RankedResult lsta, RankedResult lstb ) ->
            RankedResult (lsta ++ lstb |> List.sortBy getRank)

        ( RankedResult lsta, Unranked [] ) ->
            RankedResult lsta

        ( Unranked [], RankedResult lstb ) ->
            RankedResult lstb

        ( RankedResult lsta, Unranked lstb ) ->
            Unranked (unrank lsta ++ lstb)

        ( Unranked lsta, RankedResult lstb ) ->
            Unranked (lsta ++ unrank lstb)

        ( Unranked lsta, Unranked lstb ) ->
            Unranked (lsta ++ lstb)


concatRanked : List (RankedResult a) -> RankedResult a
concatRanked rs =
    List.foldl joinRanked (Unranked []) rs


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
        , publicationStatus = Nothing
        }


getKeywords : ExpositionSearch -> Set String
getKeywords s =
    case s of
        QuickSearch _ ->
            Set.empty

        Advanced (Search advancedSearch) ->
            advancedSearch.keywords


searchWithKeywords : Set String -> Search -> Search
searchWithKeywords kws (Search s) =
    Search
        { s
            | keywords = kws
        }


search : String -> String -> Set String -> String -> Maybe Date -> Maybe Date -> String -> Maybe PublicationStatus -> Search
search title author keywords abstract after before portal publicationStatus =
    Search
        { title = title
        , author = author
        , keywords = keywords
        , abstract = abstract
        , after = after
        , before = before
        , portal = portal
        , publicationStatus = publicationStatus
        }


decodeSearch : D.Decoder Search
decodeSearch =
    D.map8 search
        (field "title" string)
        (field "author" string)
        (field "keywords" (list string) |> map Set.fromList)
        (field "abstract" string)
        (maybe (field "after" int |> map Date.fromRataDie))
        (maybe (field "before" int |> map Date.fromRataDie))
        (field "portal" string)
        (maybe (field "status" (string |> D.map (RC.publicationStatusFromString >> Maybe.withDefault Undecided))))


decodeExpositionSearch : D.Decoder ExpositionSearch
decodeExpositionSearch =
    D.field "type" string
        |> D.andThen
            (\t ->
                case t of
                    "quick" ->
                        field "search" string |> D.map QuickSearch

                    "advanced" ->
                        field "search" decodeSearch |> D.map Advanced

                    _ ->
                        D.fail "corrupted json, expected { \"type\" : \"quicksearch\" }"
            )


encodeExpositionSearch : ExpositionSearch -> E.Value
encodeExpositionSearch expSearch =
    case expSearch of
        QuickSearch qs ->
            E.object
                [ ( "type", E.string "quick" )
                , ( "search", E.string qs )
                ]

        Advanced srch ->
            E.object
                [ ( "type", E.string "advanced" )
                , ( "search", encodeSearch srch )
                ]


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

        status =
            data.publicationStatus |> Maybe.map (\st -> ( "status", RC.publicationstatus st ))
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
            |> appendMaybe status
        )


type SearchQuery
    = FindKeywords String RC.KeywordSorting (Maybe Int)
    | FindResearch ExpositionSearch
    | GetAllKeywords
    | GetAllPortals
    | GetExposition RC.ExpositionID


type
    SearchResult
    --= Expositions (List (RC.Research ResearchWithKeywords))
    = RankedExpositions (RankedResult ResearchWithKeywords)
    | Keywords (List RC.Keyword)
    | AllKeywords (List RC.Keyword)
    | AllPortals (List RC.Portal)
    | Exposition (Result String ResearchWithKeywords)


decodeSearchResult : D.Decoder SearchResult
decodeSearchResult =
    let
        parseResult typ =
            case typ of
                -- "expositions" ->
                --     D.field "expositions" (D.list EnrichedResearch.decoder |> D.map Expositions)
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
        -- Expositions exps ->
        --     E.object
        --         [ ( "type", E.string "expositions" )
        --         , ( "expositions", E.list EnrichedResearch.encodeResearchWithKeywords exps )
        --         ]
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
                        D.map3 FindKeywords
                            (field "keywords" string |> D.map String.toLower)
                            (field "sorting" decodeKeywordSorting)
                            (maybe (field "portal" int))

                    "FindResearch" ->
                        D.map FindResearch
                            (field "search" decodeExpositionSearch)

                    "GetAllKeywords" ->
                        D.succeed GetAllKeywords

                    "GetAllPortals" ->
                        D.succeed GetAllPortals

                    "GetExposition" ->
                        field "id" int |> D.map (\id -> GetExposition id)

                    _ ->
                        D.fail "Unknown query type"
            )


prependMaybe : Maybe a -> List a -> List a
prependMaybe x xs =
    case x of
        Nothing ->
            xs

        Just some ->
            some :: xs


encodeSearchQuery : SearchQuery -> E.Value
encodeSearchQuery query =
    case query of
        FindKeywords keywords sorting mportal ->
            let
                maybePortal =
                    mportal |> Maybe.map (\p -> ( "portal", E.int p ))
            in
            E.object
                (prependMaybe maybePortal
                    [ ( "type", E.string "FindKeywords" )
                    , ( "keywords", E.string (String.toLower keywords) ) -- Badly named: this is only a query for searching keywords
                    , ( "sorting", encodeKeywordSorting sorting )
                    ]
                )

        FindResearch srch ->
            E.object
                [ ( "type", E.string "FindResearch" )
                , ( "search", encodeExpositionSearch srch )
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
                    [ " " ]
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
                                        (\x -> getRank x |> (\score -> score < 50))
                                    |> RankedResult
                   )


findResearchWithAuthor : String -> RankedResult (Research r) -> RankedResult (Research r)
findResearchWithAuthor qauthor lst =
    let
        simplified s =
            s |> String.toLower |> String.Normalize.removeDiacritics

        f : Research r -> Bool
        f r =
            r.author |> RC.getName |> simplified |> String.contains (simplified qauthor)

        fragments : Research r -> Bool
        fragments r =
            let
                authorname =
                    r.author |> RC.getName |> simplified

                test =
                    qauthor |> simplified |> String.split " " |> List.any (\qFrag -> String.contains qFrag authorname)
            in
            test
    in
    case qauthor of
        "" ->
            lst

        _ ->
            let
                res =
                    filterRanked f lst
            in
            case toList res of
                [] ->
                    -- let
                    --     _ =
                    --         Debug.log "nothing was found, do a more pessimistic search" ""
                    -- in
                    filterRanked fragments lst

                _ ->
                    res



-- _ ->
--     res


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

        -- isJust m =
        --     case m of
        --         Just _ ->
        --             True
        --         Nothing ->
        --             False
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

        "All Portals" ->
            lst

        "Any portal" ->
            lst

        nonemptyq ->
            let
                f : Research r -> Bool
                f research =
                    let
                        names =
                            (research.portals ++ research.connectedTo) |> List.map (.name >> String.toLower)
                    in
                    names |> List.any (\p -> p == (nonemptyq |> String.toLower))
            in
            filterRanked f lst


filterResearchWithPortal : String -> List (Research r) -> List (Research r)
filterResearchWithPortal portalq lst =
    -- let
    --     _ =
    --         Debug.log portalq "portalq"
    -- in
    case portalq of
        "" ->
            lst

        "All Portals" ->
            lst

        "Any portal" ->
            lst

        nonemptyq ->
            let
                f : Research r -> Bool
                f research =
                    let
                        names =
                            (research.portals ++ research.connectedTo) |> List.map (.name >> String.toLower)
                    in
                    names |> List.any (\p -> p == (nonemptyq |> String.toLower))
            in
            List.filter f lst


filterResearchWithPortalID : Int -> List (Research r) -> List (Research r)
filterResearchWithPortalID portalID lst =
    let
        f : Research r -> Bool
        f research =
            let
                names =
                    (research.portals ++ research.connectedTo) |> List.map .id
            in
            names |> List.any (\p -> p == portalID)
    in
    List.filter f lst



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


findResearchWithStatus : Maybe PublicationStatus -> RankedResult (Research r) -> RankedResult (Research r)
findResearchWithStatus mstatus lst =
    case mstatus of
        Nothing ->
            lst

        Just Undecided ->
            lst

        Just status ->
            filterRanked
                (\r -> r.publicationStatus == status)
                lst
