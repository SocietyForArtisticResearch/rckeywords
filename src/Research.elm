-- TODO, change a date to really a date type
-- Type Date = Dmy Int Int Int
-- also allow sorting on that


module Research exposing
    ( Author(..)
    , ExpositionID
    , Keyword(..)
    , KeywordSet(..)
    , KeywordSorting(..)
    , Portal
    , PublicationStatus(..)
    , Research
    , ReverseKeywordDict
    , TitleSorting(..)
    , author
    , authorAsString
    , authorUrl
    , calcStatus
    , decodeExposition
    , decodeKeyword
    , decodePublicationStatus
    , decodeWorkerPortal
    , decoder
    , dmyToYmd
    , emptyKeywordSet
    , encodeAuthor
    , encodeExposition
    , encodeKeyword
    , encodePortal
    , findResearchAfter
    , findResearchWithAuthor
    , findResearchWithKeywords
    , findResearchWithPortal
    , findResearchWithTitle
    , getAllPortals
    , getAuthorId
    , getCount
    , getName
    , insert
    , keyword
    , keywordSet
    , kwName
    , newKey
    , publicationstatus
    , rcDateToPosix
    , reverseKeywordDict
    , shuffleWithSeed
    , sortingFromString
    , sortingToString
    , titleSortingFromString
    , titleSortingToString
    , toList
    , use
    )

import Dict exposing (Dict)
import Iso8601
import Json.Decode exposing (Decoder, field, int, maybe, string)
import Json.Decode.Extra as JDE
import Json.Encode
import KeywordString exposing (KeywordString)
import List.Extra exposing (uniqueBy)
import Random
import Random.List
import Set exposing (Set)
import Time exposing (Posix)


type alias ExpositionID =
    Int


type alias Portal =
    { id : Int
    , name : String
    , type_ : PortalType
    }



-- Worker


encodePortal : Portal -> Json.Encode.Value
encodePortal portal =
    Json.Encode.object
        [ ( "id", Json.Encode.int portal.id )
        , ( "name", Json.Encode.string portal.name )
        , ( "type_", Json.Encode.string (portal.type_ |> portalTypeToString) )
        ]



-- Worker


decodeWorkerPortal : Json.Decode.Decoder Portal
decodeWorkerPortal =
    Json.Decode.map3 Portal
        (Json.Decode.field "id" Json.Decode.int)
        (Json.Decode.field "name" Json.Decode.string)
        (Json.Decode.field "type_" Json.Decode.string |> Json.Decode.map portalTypeFromString)


type PortalType
    = Institutional
    | Journal
    | Project
    | MainPortal



-- Worker


portalTypeToString : PortalType -> String
portalTypeToString portaltype =
    case portaltype of
        Institutional ->
            "Institutional"

        Journal ->
            "Journal"

        Project ->
            "Project"

        MainPortal ->
            "MainPortal"


portalTypeFromString : String -> PortalType
portalTypeFromString str =
    case str of
        "Institutional" ->
            Institutional

        "Journal" ->
            Journal

        "Project" ->
            Project

        "MainPortal" ->
            MainPortal

        _ ->
            Institutional



-- RC API portal lookup:


portalType : String -> PortalType
portalType portalName =
    let
        institutional =
            [ "KC Research Portal", "Stockholm University of the Arts (SKH)", "University of the Arts Helsinki", "Norwegian Academy of Music", "The Danish National School of Performing Arts", "Rhythmic Music Conservatory Copenhagen", "Konstfack - University of Arts, Crafts and Design", "NTNU", "i2ADS - Research Institute in Art, Design and Society", "University of Applied Arts Vienna", "Academy of Creative and Performing Arts", "International Center for Knowledge in the Arts (Denmark)", "Inland Norway University of Applied Sciences, The Norwegian Film School", "Fontys Academy of the Arts (internal)" ]
    in
    -- TODO match  for other types of portal !
    if List.member portalName institutional then
        Institutional

    else
        Journal



-- RC API


rcPortalDecoder : Json.Decode.Decoder Portal
rcPortalDecoder =
    Json.Decode.map3 Portal
        (Json.Decode.field "id" Json.Decode.int)
        (Json.Decode.field "name" Json.Decode.string)
        (Json.Decode.field "name" Json.Decode.string |> Json.Decode.map portalType)


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



-- RC API


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



-- RC API


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


getAllPortals : List Research -> List Portal
getAllPortals lst =
    lst
        |> List.concatMap .portals
        |> uniqueBy (\p -> p.id)


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
    Keyword { count = 1, name = str |> String.toLower }


insert : KeywordString -> KeywordSet -> KeywordSet
insert k (KeywordSet set) =
    let
        klower =
            KeywordString.toString k

        dict : Dict String Keyword
        dict =
            set.dict

        result : Maybe Keyword
        result =
            Dict.get klower dict
    in
    case result of
        Just (Keyword kw) ->
            let
                used : Keyword
                used =
                    use (Keyword kw)

                newDict : Dict String Keyword
                newDict =
                    Dict.insert (kw.name |> String.toLower) used dict
            in
            KeywordSet { set | dict = newDict, list = Dict.values newDict }

        Nothing ->
            let
                new : Keyword
                new =
                    newKey klower
            in
            KeywordSet { set | dict = Dict.insert klower new dict, list = new :: set.list }


kwName : Keyword -> String
kwName (Keyword kw) =
    kw.name |> String.toLower


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



-- RC API


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



-- WORKER exposition


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
            -> List KeywordString
            -> String
            -> Author
            -> Maybe Int
            -> PublicationStatus
            -> Maybe String
            -> Maybe String
            -> Maybe String
            -> String
            -> List Portal
            -> Research
        mkExp i t kw cr au iss pub publ thum abs d rcportal =
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
            , portals = rcportal
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
                            |> andMap (field "keywords" (Json.Decode.list string) |> Json.Decode.map (List.map KeywordString.fromString))
                            |> andMap (field "created" string)
                            |> andMap (field "author" author)
                            |> andMap (JDE.optionalField "issueId" int)
                            |> andMap (field "publicationStatus" decodePublicationStatus)
                            |> andMap (JDE.optionalField "publication" string)
                            |> andMap (JDE.optionalField "thumbnail" string)
                            |> andMap (JDE.optionalField "abstract" string)
                            |> andMap (field "defaultPage" string)
                            |> andMap (field "portals" (Json.Decode.list decodeWorkerPortal))

                    _ ->
                        Json.Decode.fail "expected an exposition"
            )


encodeAuthor : Author -> Json.Encode.Value
encodeAuthor au =
    Json.Encode.object
        [ ( "name", Json.Encode.string (getName au) )
        , ( "id", Json.Encode.int (getAuthorId au) )
        ]



-- this is a "local" decoder for communication with the worker.
-- So here we do not have to calculate the publication status etc..


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
         , ( "keywords", list string (List.map KeywordString.toString exp.keywords) )
         , ( "author", encodeAuthor exp.author )
         , ( "publicationStatus", publicationstatus exp.publicationStatus )
         , ( "defaultPage", string exp.defaultPage )
         , ( "portals", list encodePortal exp.portals )
         ]
            |> maybeAppend issueId
            |> maybeAppend publication
            |> maybeAppend thumbnail
            |> maybeAppend abstract
        )



-- This decodes from the RC search output.
-- Some properties need to be "calculated", like publication status.


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
            |> JDE.andMap (field "keywords" (Json.Decode.list string) |> Json.Decode.map (List.map KeywordString.fromString))
            |> JDE.andMap (field "created" string |> Json.Decode.map dmyToYmd)
            |> JDE.andMap (field "author" author)
            |> JDE.andMap (maybe (field "issue" <| field "id" int))
            |> JDE.andMap (Json.Decode.map statusFromString (field "status" string))
            |> JDE.andMap (maybe (field "published" string))
            |> JDE.andMap (maybe (field "thumb" string))
            |> JDE.andMap (maybe (field "abstract" string))
            |> JDE.andMap (field "default-page" string)
            |> JDE.andMap (field "published_in" (Json.Decode.list rcPortalDecoder))
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
    , keywords : List KeywordString
    , created : String
    , author : Author
    , issueId : Maybe Int
    , publicationStatus : PublicationStatus -- should be string?
    , publication : Maybe String
    , thumbnail : Maybe String
    , abstract : Maybe String
    , defaultPage : String
    , portals : List Portal
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
    -- note this is case insensitive now!
    let
        addExpToKeyword : Research -> String -> Dict String (List Research) -> Dict String (List Research)
        addExpToKeyword xpo kw currentDict =
            Dict.update (kw |> String.toLower)
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
            List.foldl (addExpToKeyword exp) currentDict (exp.keywords |> List.map KeywordString.toString)
    in
    List.foldl addResearchToDict Dict.empty research


findResearchWithKeywords : Set String -> ReverseKeywordDict -> List Research -> List Research
findResearchWithKeywords kw dict research =
    let
        findKw k =
            k |> String.toLower |> (\s -> Dict.get s dict) |> Maybe.withDefault []

        getId : Research -> ExpositionID
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
                        |> List.map (findKw >> List.map getId >> Set.fromList)
                        |> combineResults

                -- the full set is the mempty of combinatory filters
            in
            research |> List.filter (\exp -> List.member exp.id ids)


findResearchWithTitle : String -> List Research -> List Research
findResearchWithTitle q lst =
    let
        f : Research -> Bool
        f r =
            r.title |> String.toLower |> String.contains (String.toLower q)
    in
    case q of
        "" ->
            lst

        _ ->
            List.filter f lst


findResearchWithAuthor : String -> List Research -> List Research
findResearchWithAuthor qauthor lst =
    let
        f : Research -> Bool
        f r =
            r.author |> getName |> String.toLower |> String.contains (String.toLower qauthor)
    in
    case qauthor of
        "" ->
            lst

        _ ->
            List.filter f lst


rcDateToPosix : String -> Result String Time.Posix
rcDateToPosix rcdate =
    --
    case rcdate |> String.split "/" of
        [ d, m, y ] ->
            [ d, m, y ] |> String.join "-" |> Iso8601.toTime |> Result.mapError (always "nope")

        _ ->
            Err "couldn't parse this"


type Compare
    = Equal
    | Smaller
    | Bigger


comparePosix : Posix -> Posix -> Compare
comparePosix p1 p2 =
    let
        ( m1, m2 ) =
            ( Time.posixToMillis p1, Time.posixToMillis p2 )
    in
    if m1 == m2 then
        Equal

    else if m1 > m2 then
        Bigger

    else
        Smaller


findResearchAfter : Time.Posix -> List Research -> List Research
findResearchAfter posix lst =
    let
        test research =
            let
                researchDate =
                    research.created |> rcDateToPosix |> Result.toMaybe |> Maybe.withDefault (Time.millisToPosix 0)
            in
            List.member (comparePosix researchDate posix) [ Bigger, Equal ]
    in
    List.filter test lst


findResearchWithPortal : String -> List Research -> List Research
findResearchWithPortal portalq lst =
    let
        _ =
            Debug.log portalq "portalq"
    in
    case portalq of
        "" ->
            lst

        nonemptyq ->
            let
                f : Research -> Bool
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
            List.filter f lst
