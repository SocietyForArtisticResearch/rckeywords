-- TODO, change a date to really a date type
-- Type Date = Dmy Int Int Int
-- also allow sorting on that


module Research exposing
    ( Author(..)
    , ExpositionID
    , Keyword(..)
    , KeywordSet(..)
    , KeywordSorting(..)
    , PublicationStatus(..)
    , Research
    , ReverseKeywordDict
    , TitleSorting(..)
    , authorAsString
    , authorUrl
    , decodeExposition
    , decodeKeyword
    , decoder
    , emptyKeywordSet
    , encodeExposition
    , encodeKeyword
    , findResearchWithKeywords
    , getCount
    , getName
    , keywordSet
    , kwName
    , reverseKeywordDict
    , shuffleWithSeed
    , sortingFromString
    , sortingToString
    , titleSortingFromString
    , titleSortingToString
    , toList
    )

import Dict exposing (Dict)
import Json.Decode exposing (Decoder, field, int, maybe, string)
import Json.Decode.Extra as JDE
import Json.Encode
import Random
import Random.List
import Set


type alias ExpositionID =
    Int


type Author
    = Author { id : Int, name : String }


authorAsString : Author -> String
authorAsString (Author a) =
    a.name


getAuthorId : Author -> Int
getAuthorId (Author a) =
    a.id


authorUrl : Author -> String
authorUrl (Author a) =
    "https://www.researchcatalogue.net/profile/?person=" ++ String.fromInt a.id


type PublicationStatus
    = InProgress
    | Published
    | Undecided


publicationstatus : PublicationStatus -> Json.Encode.Value
publicationstatus status =
    Json.Encode.string
        (case status of
            InProgress ->
                "inprogress"

            Published ->
                "published"

            Undecided ->
                "undecided"
        )


decodePublicationStatus : Json.Decode.Decoder PublicationStatus
decodePublicationStatus =
    Json.Decode.string
        |> Json.Decode.andThen
            (\str ->
                Json.Decode.succeed
                    (case str of
                        "inprogress" ->
                            InProgress

                        "published" ->
                            Published

                        _ ->
                            Undecided
                    )
            )


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


keyword : Int -> String -> Keyword
keyword count name =
    Keyword { count = count, name = name }


encodeKeyword : Keyword -> Json.Encode.Value
encodeKeyword (Keyword kw) =
    Json.Encode.object
        [ ( "type", Json.Encode.string "keyword" )
        , ( "count", Json.Encode.int kw.count )
        , ( "name", Json.Encode.string kw.name )
        ]


decodeKeyword : Json.Decode.Decoder Keyword
decodeKeyword =
    Json.Decode.field "type" Json.Decode.string
        |> Json.Decode.andThen
            (\typ ->
                case typ of
                    "keyword" ->
                        Json.Decode.map2 keyword
                            (Json.Decode.field "count" Json.Decode.int)
                            (Json.Decode.field "name" Json.Decode.string)

                    _ ->
                        Json.Decode.fail "this is not a keyword"
            )


keywordSet : List Research -> KeywordSet
keywordSet researchlist =
    List.foldr
        (\research set ->
            List.foldr insert set research.keywords
        )
        emptyKeywordSet
        researchlist


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
                used : Keyword
                used =
                    use (Keyword kw)

                newDict : Dict String Keyword
                newDict =
                    Dict.insert kw.name used dict
            in
            KeywordSet { set | dict = newDict, list = Dict.values newDict }

        Nothing ->
            let
                new : Keyword
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
getName (Author data) =
    data.name


shuffleWithSeed : Int -> List a -> List a
shuffleWithSeed seed lst =
    Random.initialSeed seed
        |> Random.step (Random.List.shuffle lst)
        |> Tuple.first


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


decodeExposition : Decoder Research
decodeExposition =
    let
        field =
            Json.Decode.field

        int =
            Json.Decode.int

        string =
            Json.Decode.string

        andMap =
            JDE.andMap

        mkExp :
            ExpositionID
            -> String
            -> List String
            -> String
            -> Author
            -> Maybe Int
            -> PublicationStatus
            -> Maybe String
            -> Maybe String
            -> Maybe String
            -> String
            -> Research
        mkExp i t kw cr au iss pub publ thum abs d =
            { id = i
            , title = t
            , keywords = kw
            , created = cr
            , author = au
            , issueId = iss
            , publicationStatus = pub
            , publication = publ
            , thumbnail = thum
            , abstract = abs
            , defaultPage = d
            }
    in
    field "type" string
        |> Json.Decode.andThen
            (\typ ->
                case typ of
                    "exposition" ->
                        Json.Decode.map mkExp
                            (field "id" int)
                            |> andMap (field "title" string)
                            |> andMap (field "keywords" (Json.Decode.list string))
                            |> andMap (field "created" string)
                            |> andMap (field "author" author)
                            |> andMap (JDE.optionalField "issueId" int)
                            |> andMap (field "publicationStatus" decodePublicationStatus)
                            |> andMap (JDE.optionalField "publication" string)
                            |> andMap (JDE.optionalField "thumbnail" string)
                            |> andMap (JDE.optionalField "abstract" string)
                            |> andMap (field "defaultPage" string)

                    _ ->
                        Json.Decode.fail "expected an exposition"
            )


encodeAuthor : Author -> Json.Encode.Value
encodeAuthor au =
    Json.Encode.object
        [ ( "name", Json.Encode.string (getName au) )
        , ( "id", Json.Encode.int (getAuthorId au) )
        ]


encodeExposition : Research -> Json.Encode.Value
encodeExposition exp =
    let
        int =
            Json.Encode.int

        string =
            Json.Encode.string

        list =
            Json.Encode.list

        maybeAppend x xs =
            case x of
                Just v ->
                    v :: xs

                Nothing ->
                    xs

        issueId =
            exp.issueId
                |> Maybe.map
                    (\id ->
                        ( "id", int id )
                    )

        publication =
            exp.publication
                |> Maybe.map
                    (\p ->
                        ( "publication", string p )
                    )

        thumbnail =
            exp.thumbnail
                |> Maybe.map
                    (\t ->
                        ( "thumbnail", string t )
                    )

        abstract =
            exp.abstract
                |> Maybe.map
                    (\a ->
                        ( "abstract", string a )
                    )
    in
    Json.Encode.object
        ([ ( "type", string "exposition" )
         , ( "id", int exp.id )
         , ( "created", string exp.created )
         , ( "title", string exp.title )
         , ( "keywords", list string exp.keywords )
         , ( "author", encodeAuthor exp.author )
         , ( "publicationStatus", publicationstatus exp.publicationStatus )
         , ( "defaultPage", string exp.defaultPage )
         ]
            |> maybeAppend issueId
            |> maybeAppend publication
            |> maybeAppend thumbnail
            |> maybeAppend abstract
        )


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
        parts : List String
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


calcStatus : Research -> PublicationStatus
calcStatus research =
    case research.publicationStatus of
        InProgress ->
            InProgress

        _ ->
            Published


type alias ReverseKeywordDict =
    Dict String (List Research)


reverseKeywordDict : List Research -> ReverseKeywordDict
reverseKeywordDict research =
    let
        addExpToKeyword : Research -> String -> Dict String (List Research) -> Dict String (List Research)
        addExpToKeyword xpo kw currentDict =
            Dict.update kw
                (\value ->
                    case value of
                        Nothing ->
                            Just [ xpo ]

                        Just lst ->
                            Just (xpo :: lst)
                )
                currentDict

        addResearchToDict : Research -> Dict String (List Research) -> Dict String (List Research)
        addResearchToDict exp currentDict =
            -- this exposition has keywords k1 k2 k3
            List.foldl (addExpToKeyword exp) currentDict exp.keywords
    in
    List.foldl addResearchToDict Dict.empty research


findResearchWithKeywords : List String -> ReverseKeywordDict -> List Research -> List Research
findResearchWithKeywords kw dict research =
    let
        findKw k =
            k |> (\s -> Dict.get s dict) |> Maybe.withDefault []

        getId : Research -> ExpositionID
        getId exp =
            exp.id

        {- for each keyword, return the id's that have it, now take the union of those sets of ids -}
        {- use the ids to fetch the expositions -}
    in
    case kw of
        [] ->
            research

        _ ->
            let
                ids =
                    kw
                        |> List.map (findKw >> List.map getId >> Set.fromList)
                        |> List.foldl Set.union Set.empty
                        |> Set.toList
            in
            research |> List.filter (\exp -> List.member exp.id ids)
