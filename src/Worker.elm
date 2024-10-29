port module Worker exposing (main)

import Dict exposing (Dict)
import EnrichedResearch exposing (ResearchWithKeywords)
import Fuzzy
import Html exposing (b)
import Http
import Json.Decode as D exposing (errorToString)
import Json.Encode as E
import KeywordString exposing (KeywordString)
import List.Extra
import Platform
import Queries exposing (Search(..), SearchQuery(..))
import Random
import Random.List exposing (shuffle)
import Research as RC exposing (Keyword, KeywordSet, KeywordSorting(..), ReverseKeywordDict)
import Set



-- to avoid blocking the main thread, we sort and search keywords in this separate worker.
-- We also keep the keyword state here (as a kind of semi-backend)


port searchQuery : (D.Value -> msg) -> Sub msg


port returnResults : E.Value -> Cmd msg


port debug : String -> Cmd msg


type Msg
    = LoadData (Result Http.Error (List ResearchWithKeywords))
    | SearchQuery E.Value


type Problem
    = LoadError Http.Error
    | DecodeError


type alias LoadedModel =
    { research : List ResearchWithKeywords
    , keywords : KeywordSet
    , problems : List Problem
    , reverseKeywordDict : ReverseKeywordDict ResearchWithKeywords
    }



-- We are not sure things arrive in order, how we proceed may depend. For
-- example, if the app requests all keywords or does a search before we have
-- loaded properly, we have to store the request for later.


type Model
    = Loading
    | LoadingWithQuery SearchQuery (List SearchQuery) -- non empty list
    | Loaded LoadedModel


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case model of
        Loading ->
            case msg of
                LoadData res ->
                    case res of
                        Ok data ->
                            let
                                keywordSet =
                                    EnrichedResearch.keywordSet data
                            in
                            ( Loaded
                                { research = data
                                , keywords = keywordSet
                                , problems = []
                                , reverseKeywordDict = RC.reverseKeywordDict data
                                }
                            , Cmd.none
                            )

                        Err e ->
                            ( problemize (LoadError e) model, debug (errorToString e) )

                SearchQuery json ->
                    case D.decodeValue Queries.decodeSearchQuery json of
                        Ok query ->
                            ( LoadingWithQuery query [], Cmd.none )

                        Err e ->
                            ( problemize DecodeError model, debug (D.errorToString e) )

        -- Easiest place for seeing how a search is processed:
        Loaded lmodel ->
            case msg of
                SearchQuery json ->
                    case D.decodeValue Queries.decodeSearchQuery json of
                        Ok q ->
                            case q of
                                Queries.FindKeywords str kwSorting mportal ->
                                    case mportal of
                                        Nothing ->
                                            ( Loaded lmodel, findKeywords str kwSorting lmodel.keywords |> Queries.Keywords |> Queries.encodeSearchResult |> returnResults )

                                        Just portal ->
                                            ( Loaded lmodel, findKeywordsPortal portal lmodel.research kwSorting |> Queries.Keywords |> Queries.encodeSearchResult |> returnResults )

                                -- This is actual search form query
                                Queries.FindResearch search ->
                                    ( Loaded lmodel
                                    , searchResearch search lmodel.reverseKeywordDict lmodel.research
                                        |> Queries.RankedExpositions
                                        -- SO this  is just packaging it into the rigth type for tranposrt
                                        |> Queries.encodeSearchResult
                                        |> returnResults
                                    )

                                Queries.GetAllKeywords ->
                                    ( Loaded lmodel, findKeywords "" Alphabetical lmodel.keywords |> Queries.AllKeywords |> Queries.encodeSearchResult |> returnResults )

                                Queries.GetAllPortals ->
                                    ( Loaded lmodel
                                    , RC.getAllPortals lmodel.research
                                        |> Queries.AllPortals
                                        |> Queries.encodeSearchResult
                                        |> returnResults
                                    )

                                Queries.GetExposition id ->
                                    ( Loaded lmodel
                                    , Queries.findExpositionWithId id lmodel.research
                                        |> Queries.Exposition
                                        |> Queries.encodeSearchResult
                                        |> returnResults
                                    )

                        Err e ->
                            ( problemize DecodeError (Loaded lmodel), debug (D.errorToString e) )

                LoadData res ->
                    case res of
                        Ok data ->
                            ( Loaded
                                { lmodel
                                    | research = data
                                    , keywords = RC.keywordSet data
                                }
                            , Cmd.none
                            )

                        Err e ->
                            ( problemize (LoadError e) (Loaded lmodel), debug (errorToString e) )

        LoadingWithQuery q otherQs ->
            case msg of
                LoadData res ->
                    case res of
                        Ok data ->
                            let
                                kws : KeywordSet
                                kws =
                                    RC.keywordSet data

                                reverseKeywordDict : ReverseKeywordDict ResearchWithKeywords
                                reverseKeywordDict =
                                    RC.reverseKeywordDict data

                                -- TODO, move this function out since it is repeated. Only the "data" doesn't come out of the model
                                cmdOfQ : SearchQuery -> Cmd msg
                                cmdOfQ query =
                                    case query of
                                        FindKeywords str kwsorting mportal ->
                                            case mportal of
                                                Nothing ->
                                                    findKeywords str kwsorting kws |> Queries.Keywords |> Queries.encodeSearchResult |> returnResults

                                                Just portal ->
                                                    findKeywordsPortal portal data kwsorting |> Queries.Keywords |> Queries.encodeSearchResult |> returnResults

                                        --findKeywords str kwsorting kws |> Queries.Keywords |> Queries.encodeSearchResult |> returnResults
                                        FindResearch search ->
                                            let
                                                keywords =
                                                    search |> Queries.getKeywords
                                            in
                                            Queries.findResearchWithKeywords keywords reverseKeywordDict (Queries.Unranked data)
                                                |> Queries.RankedExpositions
                                                |> Queries.encodeSearchResult
                                                |> returnResults

                                        GetAllKeywords ->
                                            findKeywords "" Alphabetical kws
                                                |> Queries.AllKeywords
                                                |> Queries.encodeSearchResult
                                                |> returnResults

                                        Queries.GetAllPortals ->
                                            RC.getAllPortals data
                                                |> Queries.AllPortals
                                                |> Queries.encodeSearchResult
                                                |> returnResults

                                        Queries.GetExposition id ->
                                            Queries.findExpositionWithId id data
                                                |> Queries.Exposition
                                                |> Queries.encodeSearchResult
                                                |> returnResults
                            in
                            ( Loaded
                                { problems = []
                                , research = data
                                , keywords = kws
                                , reverseKeywordDict = reverseKeywordDict
                                }
                            , Cmd.batch (List.map cmdOfQ (q :: otherQs))
                            )

                        Err e ->
                            ( problemize (LoadError e) (Loaded { research = [], keywords = RC.emptyKeywordSet, problems = [], reverseKeywordDict = RC.reverseKeywordDict [] }), debug (errorToString e) )

                SearchQuery json ->
                    case D.decodeValue Queries.decodeSearchQuery json of
                        Ok query ->
                            ( LoadingWithQuery q (query :: otherQs), Cmd.none )

                        Err e ->
                            ( problemize DecodeError model, debug (D.errorToString e) )


shuffleWithSeed : Int -> List a -> List a
shuffleWithSeed seed lst =
    Random.initialSeed seed
        |> Random.step (shuffle lst)
        |> Tuple.first


findKeywords : String -> RC.KeywordSorting -> KeywordSet -> List Keyword
findKeywords query sorting keywords =
    let
        lst : List Keyword
        lst =
            RC.toList keywords

        filtered : List Keyword
        filtered =
            case query of
                "" ->
                    lst

                nonEmptyQ ->
                    lst |> List.filter (RC.kwName >> String.toLower >> String.contains (String.toLower nonEmptyQ))
    in
    case sorting of
        RC.ByUse ->
            List.sortBy (\kw -> RC.getCount kw) filtered |> List.reverse

        RC.Alphabetical ->
            List.sortBy (\kw -> RC.kwName kw) filtered

        RC.RandomKeyword ->
            shuffleWithSeed 42 filtered


findKeywordsPortal : Int -> List (RC.Research a) -> RC.KeywordSorting -> List Keyword
findKeywordsPortal portal lst sorting =
    lst |> Queries.filterResearchWithPortalID portal |> RC.keywordSet |> findKeywords "" sorting


problemize : Problem -> Model -> Model
problemize p m =
    case m of
        Loading ->
            Loading

        LoadingWithQuery q qs ->
            LoadingWithQuery q qs

        Loaded lm ->
            Loaded { lm | problems = p :: lm.problems }


init : () -> ( Model, Cmd Msg )
init _ =
    ( Loading
    , Http.get
        { url = "/enriched.json"
        , expect = Http.expectJson LoadData (D.list EnrichedResearch.decoder)
        }
    )


subscriptions : Model -> Sub Msg
subscriptions _ =
    searchQuery SearchQuery


main : Program () Model Msg
main =
    Platform.worker { init = init, update = update, subscriptions = subscriptions }


{-| Given a filter, maybe a key, filter the object
-}
optionalFilter : (a -> b -> b) -> Maybe a -> b -> b
optionalFilter filter value lst =
    case value of
        Nothing ->
            lst

        Just v ->
            lst |> filter v


{-| apply one value to a list of functions
-}
applyAll : a -> List (a -> b) -> List b
applyAll x fs =
    fs |> List.map (\f -> f x)


searchResearch : Queries.ExpositionSearch -> ReverseKeywordDict ResearchWithKeywords -> List ResearchWithKeywords -> Queries.RankedResult ResearchWithKeywords
searchResearch expSearch revDict lst =
    case expSearch of
        Queries.QuickSearch qs ->
            [ Queries.findResearchWithTitle qs lst
            , Queries.findResearchWithAuthor qs (Queries.Unranked lst)
            , Queries.findResearchWithKeywords (Set.fromList [ qs ]) revDict (Queries.Unranked lst)
            ]
                |> Queries.concatRanked
                |> Queries.uniqueRankedResult .id

        Queries.Advanced (Search search) ->
            lst
                |> Queries.findResearchWithTitle search.title
                -- |> printLength "title"
                |> Queries.findResearchWithAuthor search.author
                -- |> printLength "author"
                |> Queries.findResearchWithKeywords search.keywords revDict
                -- |> printLength "keywords"
                |> Queries.findResearchWithPortal search.portal
                |> Queries.findResearchWithAbstract search.abstract
                |> optionalFilter Queries.findResearchAfter search.after
                |> optionalFilter Queries.findResearchBefore search.before
                |> Queries.findResearchWithStatus search.publicationStatus



--|> printLength "portal"
-- |> printLength "keywords"


errorToString : Http.Error -> String
errorToString error =
    case error of
        Http.BadUrl url ->
            "The URL " ++ url ++ " was invalid"

        Http.Timeout ->
            "Unable to reach the server, try again"

        Http.NetworkError ->
            "Unable to reach the server, check your network connection"

        Http.BadStatus 500 ->
            "The server had a problem, try again later"

        Http.BadStatus 400 ->
            "Verify your information and try again"

        Http.BadStatus _ ->
            "Unknown error"

        Http.BadBody errorMessage ->
            errorMessage
