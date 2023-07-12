port module Worker exposing (main)

import Http
import Json.Decode as D
import Json.Encode as E
import Platform
import Queries exposing (SearchQuery(..))
import Random
import Random.List exposing (shuffle)
import Research as RC exposing (Keyword, KeywordSet, Research)



-- to avoid blocking the main thread, we sort and search keywords in this worker.
-- We also keep the keyword state here (as a kind of semi-backend)
-- TODO also add in the exposition searching
-- TODO make it possible to search abstract


port searchKeyword : (D.Value -> msg) -> Sub msg


port returnResults : E.Value -> Cmd msg


type Msg
    = LoadData (Result Http.Error (List Research))
    | SearchKeyword E.Value


type Problem
    = LoadError Http.Error
    | DecodeError


type alias LoadedModel =
    { research : List Research
    , keywords : KeywordSet
    , problems : List Problem
    }


type Model
    = Loading
    | LoadingWithQuery SearchQuery
    | Loaded LoadedModel


encodeKeywords : List Keyword -> E.Value
encodeKeywords =
    E.list RC.encodeKeyword


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =

    case model of
        Loading ->
            case msg of
                LoadData res ->
                    case res of
                        Ok data ->
                            ( Loaded
                                { research = data
                                , keywords = RC.keywordSet data
                                , problems = []
                                }
                            , Cmd.none
                            )

                        Err e ->
                            ( problemize (LoadError e) model, Cmd.none )

                SearchKeyword json ->
                    case D.decodeValue Queries.decodeSearchQuery json of
                        Ok query ->
                            ( LoadingWithQuery query, Cmd.none )

                        Err _ ->
                            ( problemize DecodeError model, Cmd.none )

        Loaded lmodel ->
            case msg of
                SearchKeyword json ->
       
                    case D.decodeValue Queries.decodeSearchQuery json of
                        Ok searchQuery ->
                            ( Loaded lmodel, findKeywords searchQuery lmodel.keywords |> encodeKeywords |> returnResults )

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

                                keywords : List Keyword
                                keywords =
                                    findKeywords q kws
                            in
                            ( Loaded
                                { problems = []
                                , research = data
                                , keywords = kws
                                }
                            , returnResults (encodeKeywords keywords)
                            )

                        Err e ->
                            ( problemize (LoadError e) (Loaded { research = [], keywords = RC.emptyKeywordSet, problems = [] }), Cmd.none )

                SearchKeyword json ->
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


findKeywords : Queries.SearchQuery -> KeywordSet -> List Keyword
findKeywords (FindKeywords query sorting) keywords =
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
    searchKeyword SearchKeyword


main : Program () Model Msg
main =
    Platform.worker { init = init, update = update, subscriptions = subscriptions }
