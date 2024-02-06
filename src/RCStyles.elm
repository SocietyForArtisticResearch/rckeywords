module RCStyles exposing
    ( Style(..)
    , globalFont
    , lightGray
    , metastyling
    , withStandardPadding
    )

import Element as E
import Element.Font as Font


type Style
    = Style String String


lightGray =
    E.rgb 0.9 0.9 0.9


globalFont =
    Font.monospace


withStandardPadding otherAttrs =
    E.paddingXY 0 15 :: otherAttrs


metastyling =
    [ E.width (E.maximum 400 E.fill)
    , Font.size 12
    , E.spacingXY 0 10
    , E.paddingXY 10 0
    ]
