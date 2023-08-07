module WorkerTypes exposing (..)

import Json.Decode exposing (Decoder)
import Json.Decode.Extra as JDE
import Json.Encode exposing (Value)
import KeywordString exposing (KeywordString)
import Research as RC exposing (Author, Portal, PublicationStatus(..), Research)



-- Worker


encodePortal : Portal -> Value
encodePortal portal =
    Json.Encode.object
        [ ( "id", Json.Encode.int portal.id )
        , ( "name", Json.Encode.string portal.name )
        , ( "type_", Json.Encode.string (portal.type_ |> RC.portalTypeToString) )
        ]



-- Worker


decodeWorkerPortal : Decoder Portal
decodeWorkerPortal =
    Json.Decode.map3 RC.Portal
        (Json.Decode.field "id" Json.Decode.int)
        (Json.Decode.field "name" Json.Decode.string)
        (Json.Decode.field "type_" Json.Decode.string |> Json.Decode.map RC.portalTypeFromString)


decodeExposition : Decoder RC.Research
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
            RC.ExpositionID
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
                            |> andMap (field "author" RC.author)
                            |> andMap (JDE.optionalField "issueId" int)
                            |> andMap (field "publicationStatus" RC.decodePublicationStatus)
                            |> andMap (JDE.optionalField "publication" string)
                            |> andMap (JDE.optionalField "thumbnail" string)
                            |> andMap (JDE.optionalField "abstract" string)
                            |> andMap (field "defaultPage" string)
                            |> andMap (field "portals" (Json.Decode.list decodeWorkerPortal))

                    _ ->
                        Json.Decode.fail "expected an exposition"
            )


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
         , ( "author", RC.encodeAuthor exp.author )
         , ( "publicationStatus", RC.publicationstatus exp.publicationStatus )
         , ( "defaultPage", string exp.defaultPage )
         , ( "portals", list encodePortal exp.portals )
         ]
            |> maybeAppend issueId
            |> maybeAppend publication
            |> maybeAppend thumbnail
            |> maybeAppend abstract
        )
