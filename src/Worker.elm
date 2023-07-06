port module Worker exposing (main)

import Http
import Json.Decode exposing (Decoder)
import Json.Encode as E
import Platform
import Random
import Random.List exposing (shuffle)
import Research as RC exposing (Keyword, KeywordSet, Research)



-- to avoid blocking the main thread, we sort and search keywords in this worker.
-- We also keep the keyword state here (as a kind of semi-backend)

-- TODO also add in the exposition searching
-- TODO make it possible to search abstract


port searchKeyword : (( String, String ) -> msg) -> Sub msg


port returnResults : E.Value -> Cmd msg


type Msg
    = LoadData (Result Http.Error (List Research))
    | SearchKeyword ( String, String )


type Problem
    = LoadError Http.Error


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

                SearchKeyword ( str, sorting ) ->
                    ( LoadingWithQuery (SearchQuery str (RC.sortingFromString sorting)), Cmd.none )

        Loaded lmodel ->
            case msg of
                SearchKeyword ( str, sorting ) ->
                    let
                        keywords =
                            findKeywords str (RC.sortingFromString sorting) lmodel.keywords
                    in
                    ( Loaded lmodel, returnResults (encodeKeywords keywords) )

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

        LoadingWithQuery (SearchQuery str sorting) ->
            case msg of
                LoadData res ->
                    case res of
                        Ok data ->
                            let
                                kws =
                                    RC.keywordSet data

                                keywords =
                                    findKeywords str sorting kws
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

                SearchKeyword ( q, srt ) ->
                    ( LoadingWithQuery (SearchQuery q (RC.sortingFromString srt)), Cmd.none )


shuffleWithSeed : Int -> List a -> List a
shuffleWithSeed seed lst =
    Random.initialSeed seed
        |> Random.step (shuffle lst)
        |> Tuple.first


findKeywords : String -> RC.KeywordSorting -> KeywordSet -> List Keyword
findKeywords query sorting keywords =
    let
        lst =
            RC.toList keywords

        filtered =
            case query of
                "" ->
                    lst

                nonEmptyQ ->
                    lst |> List.filter (RC.kwName >> String.toLower >> String.contains (String.toLower nonEmptyQ))

        ordered =
            case sorting of
                RC.ByUse ->
                    List.sortBy (\kw -> RC.getCount kw) filtered |> List.reverse

                RC.Alphabetical ->
                    List.sortBy (\kw -> RC.kwName kw) filtered

                RC.RandomKeyword ->
                    shuffleWithSeed 42 filtered
    in
    ordered


problemize : Problem -> Model -> Model
problemize p m =
    case m of
        Loading ->
            Loading

        LoadingWithQuery q ->
            LoadingWithQuery q

        Loaded lm ->
            Loaded { lm | problems = p :: lm.problems }


type SearchQuery
    = SearchQuery String RC.KeywordSorting


init : () -> ( Model, Cmd Msg )
init _ =
    ( Loading
    , Http.get
        { url = "/internal_research.json"
        , expect = Http.expectJson LoadData (Json.Decode.list RC.decoder)
        }
    )


subscriptions : Model -> Sub Msg
subscriptions _ =
    searchKeyword SearchKeyword


main : Program () Model Msg
main =
    Platform.worker { init = init, update = update, subscriptions = subscriptions }
