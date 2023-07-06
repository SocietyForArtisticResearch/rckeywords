module Research exposing
    ( Author(..)
    , ExpositionID
    , Keyword(..)
    , KeywordSet(..)
    , KeywordSorting(..)
    , PublicationStatus(..)
    , Research
    , TitleSorting(..)
    , calcStatus
    , decodeKeyword
    , decoder
    , emptyKeywordSet
    , encodeKeyword
    , find
    , getCount
    , getName
    , insert
    , keywordSet
    , kwName
    , newKey
    , shuffleWithSeed
    , sortKeywordLst
    , sortingFromString
    , sortingToString
    , titleSortingFromString
    , titleSortingToString
    , toList
    , totalNumber
    , use
    , authorAsString
    , authorUrl
    )

import Dict exposing (Dict)
import Json.Decode exposing (Decoder, field, int, maybe, string)
import Json.Decode.Extra as JDE
import Json.Encode
import Random
import Random.List


type alias ExpositionID =
    Int


type Author
    = Author { id : Int, name : String }

authorAsString : Author -> String
authorAsString (Author a) =
    a.name


authorUrl : Author -> String
authorUrl (Author a) =
    "https://www.researchcatalogue.net/profile/?person=" ++ String.fromInt a.id


type PublicationStatus
    = InProgress
    | Published
    | Undecided


type KeywordSet
    = KeywordSet
        { dict : Dict String Keyword
        , list : List Keyword
        }


type KeywordSorting
    = ByUse
    | Alphabetical
    | RandomKeyword


sortingToString : KeywordSorting -> String
sortingToString s =
    case s of
        ByUse ->
            "byuse"

        Alphabetical ->
            "alphabetical"

        RandomKeyword ->
            "randomkeyword"


sortingFromString : String -> KeywordSorting
sortingFromString str =
    case str of
        "byuse" ->
            ByUse

        "alphabetical" ->
            Alphabetical

        "randomkeyword" ->
            RandomKeyword

        _ ->
            ByUse


type TitleSorting
    = Random
    | OldestFirst
    | NewestFirst


titleSortingFromString : String -> TitleSorting
titleSortingFromString string =
    case string of
        "random" ->
            Random

        "oldestfirst" ->
            OldestFirst

        "newestfirst" ->
            NewestFirst

        _ ->
            NewestFirst


titleSortingToString : TitleSorting -> String
titleSortingToString sorting =
    case sorting of
        Random ->
            "random"

        OldestFirst ->
            "oldestfirst"

        NewestFirst ->
            "newestfirst"


type Keyword
    = Keyword { count : Int, name : String }


keywordSet : List Research -> KeywordSet
keywordSet researchlist =
    List.foldr
        (\research set ->
            List.foldr insert set research.keywords
        )
        emptyKeywordSet
        researchlist


find : String -> KeywordSet -> Maybe Keyword
find keywordStr (KeywordSet set) =
    set.dict |> Dict.get keywordStr


toList : KeywordSet -> List Keyword
toList (KeywordSet kwSet) =
    kwSet.list


emptyKeywordSet : KeywordSet
emptyKeywordSet =
    KeywordSet { dict = Dict.empty, list = [] }


use : Keyword -> Keyword
use (Keyword kw) =
    Keyword { kw | count = kw.count + 1 }


newKey : String -> Keyword
newKey str =
    Keyword { count = 1, name = str }


insert : String -> KeywordSet -> KeywordSet
insert k (KeywordSet set) =
    let
        dict : Dict String Keyword
        dict =
            set.dict

        result : Maybe Keyword
        result =
            Dict.get k dict
    in
    case result of
        Just (Keyword kw) ->
            let
                used =
                    use (Keyword kw)

                newDict =
                    Dict.insert kw.name used dict
            in
            KeywordSet { set | dict = newDict, list = Dict.values newDict }

        Nothing ->
            let
                new =
                    newKey k
            in
            KeywordSet { set | dict = Dict.insert k new dict, list = new :: set.list }


kwName : Keyword -> String
kwName (Keyword kw) =
    kw.name


getCount : Keyword -> Int
getCount (Keyword kw) =
    kw.count


getName : Author -> String
getName (Author author) =
    author.name


totalNumber : KeywordSet -> Int
totalNumber (KeywordSet set) =
    set.dict |> Dict.keys |> List.length


shuffleWithSeed : Int -> List a -> List a
shuffleWithSeed seed lst =
    Random.initialSeed seed
        |> Random.step (Random.List.shuffle lst)
        |> Tuple.first


sortKeywordLst : KeywordSorting -> List Keyword -> List Keyword
sortKeywordLst sorting lst =
    case sorting of
        ByUse ->
            lst |> List.sortBy getCount |> List.reverse

        Alphabetical ->
            lst |> List.sortBy kwName

        RandomKeyword ->
            lst |> shuffleWithSeed 42


decoder : Decoder Research
decoder =
    let
        researchPublicationStatus : Research -> Research
        researchPublicationStatus research =
            { research | publicationStatus = calcStatus research }

        statusFromString : String -> PublicationStatus
        statusFromString statusString =
            case statusString of
                "published" ->
                    Published

                "progress" ->
                    InProgress

                _ ->
                    Undecided

        author : Decoder Author
        author =
            let
                makeAuthor : Int -> String -> Author
                makeAuthor id name =
                    Author { id = id, name = name }
            in
            Json.Decode.map2
                makeAuthor
                (Json.Decode.field "id" Json.Decode.int)
                (Json.Decode.field "name" Json.Decode.string)
    in
    Json.Decode.map researchPublicationStatus <|
        (Json.Decode.succeed
            Research
            |> JDE.andMap (field "id" int)
            |> JDE.andMap (field "title" string)
            |> JDE.andMap (field "keywords" (Json.Decode.list string))
            |> JDE.andMap (field "created" string |> Json.Decode.map dmyToYmd)
            |> JDE.andMap (field "author" author)
            |> JDE.andMap (maybe (field "issue" <| field "id" int))
            |> JDE.andMap (Json.Decode.map statusFromString (field "status" string))
            |> JDE.andMap (maybe (field "published" string))
            |> JDE.andMap (maybe (field "thumb" string))
            |> JDE.andMap (maybe (field "abstract" string))
            |> JDE.andMap (field "default-page" string)
        )

dmyToYmd : String -> String
dmyToYmd dmy =
    let
        parts =
            String.split "/" dmy
    in
    case parts of
        [ day, month, year ] ->
            year ++ "/" ++ month ++ "/" ++ day

        _ ->
            dmy

type alias Research =
    { id : ExpositionID
    , title : String
    , keywords : List String
    , created : String
    , author : Author
    , issueId : Maybe Int
    , publicationStatus : PublicationStatus -- should be string?
    , publication : Maybe String
    , thumbnail : Maybe String
    , abstract : Maybe String
    , defaultPage : String
    }


encodeKeyword : Keyword -> Json.Encode.Value
encodeKeyword (Keyword kw) =
    Json.Encode.object
        [ ( "name", Json.Encode.string kw.name )
        , ( "count", Json.Encode.int kw.count )
        ]


decodeKeyword : Decoder Keyword
decodeKeyword =
    let
        keyword n c =
            Keyword { name = n, count = c }
    in
    Json.Decode.map2
        keyword
        (Json.Decode.field "name" Json.Decode.string)
        (Json.Decode.field "count" Json.Decode.int)


calcStatus : Research -> PublicationStatus
calcStatus research =
    case research.publicationStatus of
        InProgress ->
            InProgress

        _ ->
            case research.issueId of
                Just _ ->
                    Published

                Nothing ->
                    Published
