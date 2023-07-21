port module Worker exposing (main)

import Http
import Json.Decode as D
import Json.Encode as E
import Platform
import Queries exposing (SearchQuery(..))
import Random
import Random.List exposing (shuffle)
import Research as RC exposing (Keyword, KeywordSet, Research, ReverseKeywordDict, reverseKeywordDict)



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
    | LoadingWithQuery SearchQuery
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
                            ( LoadingWithQuery query, Cmd.none )

                        Err _ ->
                            ( problemize DecodeError model, Cmd.none )

        Loaded lmodel ->
            case msg of
                SearchQuery json ->
                    case D.decodeValue Queries.decodeSearchQuery json of
                        Ok q ->
                            case q of
                                Queries.FindKeywords str kwSorting ->
                                    ( Loaded lmodel, findKeywords str kwSorting lmodel.keywords |> Queries.Keywords |> Queries.encodeSearchResult |> returnResults )

                                Queries.FindResearch kws ->
                                    ( Loaded lmodel, findResearch kws lmodel.reverseKeywordDict |> Queries.Expositions |> Queries.encodeSearchResult |> returnResults )

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

        LoadingWithQuery q ->
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

                                cmd : Cmd msg
                                cmd =
                                    case q of
                                        FindKeywords str kwsorting ->
                                            findKeywords str kwsorting kws |> Queries.Keywords |> Queries.encodeSearchResult |> returnResults

                                        FindResearch keywords ->
                                            findResearch keywords reverseKeywordDict |> Queries.Expositions |> Queries.encodeSearchResult |> returnResults
                            in
                            ( Loaded
                                { problems = []
                                , research = data
                                , keywords = kws
                                , reverseKeywordDict = reverseKeywordDict
                                }
                            , cmd
                            )

                        Err e ->
                            ( problemize (LoadError e) (Loaded { research = [], keywords = RC.emptyKeywordSet, problems = [], reverseKeywordDict = RC.reverseKeywordDict [] }), Cmd.none )

                SearchQuery json ->
                    case D.decodeValue Queries.decodeSearchQuery json of
                        Ok query ->
                            ( LoadingWithQuery query, Cmd.none )

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


findExpositionsWithKeywords : List RC.Keyword -> List RC.Research -> List RC.Research
findExpositionsWithKeywords keywords expositions =
    let
        hasKeyword keyword exposition =
            List.member (keyword |> RC.kwName) exposition.keywords

        filterForKeyword keyword =
            expositions |> List.filter (hasKeyword keyword)
    in
    keywords |> List.concatMap (\kw -> filterForKeyword kw)


findResearch : List RC.Keyword -> ReverseKeywordDict -> List RC.Research
findResearch kws reverseDict =
    RC.matchMultipleKeywords kws reverseDict


problemize : Problem -> Model -> Model
problemize p m =
    case m of
        Loading ->
            Loading

        LoadingWithQuery q ->
            LoadingWithQuery q

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
