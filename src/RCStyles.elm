module RCStyles exposing
    ( Style(..)
    , globalFont
    , lightGray
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
    E.paddingXY 15 15 :: otherAttrs
