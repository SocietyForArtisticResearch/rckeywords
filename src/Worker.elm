port module Worker exposing (main)

import Http
import Json.Decode as D
import Json.Encode as E
import Platform
import Queries exposing (Search(..), SearchQuery(..))
import Random
import Random.List exposing (shuffle)
import Research as RC exposing (Keyword, KeywordSet, KeywordSorting(..), Research, ReverseKeywordDict)
import Set



-- to avoid blocking the main thread, we sort and search keywords in this worker.
-- We also keep the keyword state here (as a kind of semi-backend)
-- TODO also add in the exposition searching
-- TODO make it possible to search abstract


port searchQuery : (D.Value -> msg) -> Sub msg


port returnResults : E.Value -> Cmd msg


type Msg
    = LoadData (Result Http.Error (List Research))
    | SearchQuery E.Value


type Problem
    = LoadError Http.Error
    | DecodeError


type alias LoadedModel =
    { research : List Research
    , keywords : KeywordSet
    , problems : List Problem
    , reverseKeywordDict : ReverseKeywordDict
    }


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
                                    RC.keywordSet data
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
                            ( problemize (LoadError e) model, Cmd.none )

                SearchQuery json ->
                    case D.decodeValue Queries.decodeSearchQuery json of
                        Ok query ->
                            ( LoadingWithQuery query [], Cmd.none )

                        Err _ ->
                            ( problemize DecodeError model, Cmd.none )

        -- Easiest place for seeing how a search is processed:
        Loaded lmodel ->
            case msg of
                SearchQuery json ->
                    case D.decodeValue Queries.decodeSearchQuery json of
                        Ok q ->
                            case q of
                                Queries.FindKeywords str kwSorting ->
                                    ( Loaded lmodel, findKeywords str kwSorting lmodel.keywords |> Queries.Keywords |> Queries.encodeSearchResult |> returnResults )

                                -- This is actual search form query
                                Queries.FindResearch search ->
                                    ( Loaded lmodel
                                    , searchResearch search lmodel.reverseKeywordDict lmodel.research
                                        |> Queries.Expositions
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

                        Err _ ->
                            ( problemize DecodeError (Loaded lmodel), Cmd.none )

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
                            ( problemize (LoadError e) (Loaded lmodel), Cmd.none )

        LoadingWithQuery q otherQs ->
            case msg of
                LoadData res ->
                    case res of
                        Ok data ->
                            let
                                kws : KeywordSet
                                kws =
                                    RC.keywordSet data

                                reverseKeywordDict : ReverseKeywordDict
                                reverseKeywordDict =
                                    RC.reverseKeywordDict data

                                cmdOfQ : SearchQuery -> Cmd msg
                                cmdOfQ query =
                                    case query of
                                        FindKeywords str kwsorting ->
                                            findKeywords str kwsorting kws |> Queries.Keywords |> Queries.encodeSearchResult |> returnResults

                                        FindResearch search ->
                                            let
                                                keywords =
                                                    search |> Queries.getKeywords
                                            in
                                            RC.findResearchWithKeywords keywords reverseKeywordDict data
                                                |> Queries.Expositions
                                                |> Queries.encodeSearchResult
                                                |> returnResults

                                        GetAllKeywords ->
                                            findKeywords "" Alphabetical kws
                                                |> Queries.AllKeywords
                                                |> Queries.encodeSearchResult
                                                |> returnResults

                                        Queries.GetAllPortals ->
                                            RC.getAllPortals data |> Queries.AllPortals |> Queries.encodeSearchResult |> returnResults
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
                            ( problemize (LoadError e) (Loaded { research = [], keywords = RC.emptyKeywordSet, problems = [], reverseKeywordDict = RC.reverseKeywordDict [] }), Cmd.none )

                SearchQuery json ->
                    case D.decodeValue Queries.decodeSearchQuery json of
                        Ok query ->
                            ( LoadingWithQuery q (query :: otherQs), Cmd.none )

                        Err _ ->
                            ( problemize DecodeError model, Cmd.none )


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
        { url = "/internal_research.json"
        , expect = Http.expectJson LoadData (D.list RC.decoder)
        }
    )


subscriptions : Model -> Sub Msg
subscriptions _ =
    searchQuery SearchQuery


main : Program () Model Msg
main =
    Platform.worker { init = init, update = update, subscriptions = subscriptions }


printLength : String -> List a -> List a
printLength label lst =
    lst


searchResearch : Search -> ReverseKeywordDict -> List Research -> List Research
searchResearch (Search search) revDict lst =
    -- TODO implement dates
    lst
        |> RC.findResearchWithTitle search.title
        -- |> printLength "title"
        |> RC.findResearchWithAuthor search.author
        -- |> printLength "author"
        |> RC.findResearchWithKeywords search.keywords revDict
        -- |> printLength "keywords"
        |> RC.findResearchWithPortal search.portal



--|> printLength "portal"
-- |> printLength "keywords"
