module KeywordString exposing (..)
import Element exposing (..)
import Element.Font as Font


type KeywordString
    = KeywordString String


toString : KeywordString -> String
toString (KeywordString k) =
    k


toLink : KeywordString -> Element msg
toLink (KeywordString k) =
    link [ Font.size 13]
        { url = "/#/research/search/list?author&keyword=" ++ k
        , label = text ("#" ++ k ++ "  ")
        }


fromString : String -> KeywordString
fromString str =
    KeywordString (str |> String.toLower |> String.trim)
