port module Worker exposing (main)

import Http
import Json.Decode exposing (Decoder)
import Json.Encode as E
import Platform
import Random
import Random.List exposing (shuffle)
import Research as RC exposing (Keyword, KeywordSet, Research)


port searchKeyword : (( String, String ) -> msg) -> Sub msg


port returnResults : E.Value -> Cmd msg


type Msg
    = LoadData (Result Http.Error (List Research))
    | SearchKeyword ( String, String )
    | FoundKeywords (List Keyword)


type Problem
    = LoadError Http.Error


encodeKeywords : List Keyword -> E.Value
encodeKeywords =
    E.list RC.encodeKeyword


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        FoundKeywords lst ->
            ( model, returnResults (encodeKeywords lst) )

        LoadData res ->
            case res of
                Ok data ->
                    ( { model
                        | research = data
                        , keywords = RC.keywordSet data
                      }
                    , Cmd.none
                    )

                Err e ->
                    ( problemize (LoadError e) model, Cmd.none )

        SearchKeyword ( str, sorting ) ->
            let
                sort =
                    RC.sortingFromString sorting

                result =
                    findKeywords str sort model.keywords
            in
            ( model, returnResults (encodeKeywords result) )


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
            lst |> List.filter (RC.kwName >> String.contains query)


        ordered =
            case sorting of
                RC.ByUse ->
                    List.sortBy (\kw -> RC.getCount kw) filtered

                RC.Alphabetical ->
                    List.sortBy (\kw -> RC.kwName kw) filtered

                RC.RandomKeyword ->
                    shuffleWithSeed 42 filtered

    in
    ordered


problemize : Problem -> Model -> Model
problemize p m =
    { m | problems = p :: m.problems }


type alias Model =
    { research : List Research
    , keywords : KeywordSet
    , problems : List Problem
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { research = []
      , keywords = RC.emptyKeywordSet
      , problems = []
      }
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
