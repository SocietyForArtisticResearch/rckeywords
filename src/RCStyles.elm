module RCStyles exposing
    ( Style(..)
    , defaultPadding
    , globalFont
    , lightGray
    , mediumFont
    , rcButtonStyle
    , statusStyle
    )

import Element as E
import Element.Font as Font
import Html exposing (Attribute)
import Html.Attributes exposing (style)


type Style
    = Style String String


lightGray =
    E.rgb 0.9 0.9 0.9


globalFont =
    Font.monospace


mediumFont =
    Font.size 15


statusStyle : List (E.Attribute msg)
statusStyle =
    [ Font.size 12
    , E.paddingXY 0 10
    ]


ofStyle : Style -> Attribute msg
ofStyle (Style prop val) =
    style prop val


defaultPadding : List (E.Attribute msg)
defaultPadding =
    [ E.paddingXY 15 25
    ]


rcButtonStyle : List (Attribute msg)
rcButtonStyle =
    [ Style "font-family" "'PT Sans', arial, sans-serif"
    , Style "text-transform" "uppercase"
    , Style "letter-spacing" "1px"
    , Style "background" "#FFF"
    , Style "color" "#999"
    , Style "border" "solid 1px #999"
    , Style "text-align" "center"
    , Style "min-width" "124px"
    , Style "line-height" "11px"
    , Style "margin" "10px 0 0 10px"
    , Style "padding" "7px"
    , Style "font-size" "11px"
    , Style "box-sizing" "border-box"
    ]
        |> List.map ofStyle
