module Page exposing (CellSize(..), Matrix(..), Scale(..), ScreenDimensions, calcCellSize, calcMatrix, calcPageSize, makeMatrix, makeNumColumns, sizeToInt, transpose)

import Element exposing (Element, fill, width)



{- future intention:
    calculate the cellsize and matrix dimensions once, and store it as
   an opaque type
-}


type alias ScreenDimensions =
    { w : Int, h : Int }


type Matrix
    = Matrix Int Int


type CellSize
    = CellSize Int


sizeToInt : CellSize -> Int
sizeToInt (CellSize i) =
    i


type Scale
    = Micro
    | Small
    | Medium
    | Large


makeMatrix : ScreenDimensions -> Scale -> (Int -> item -> Element msg) -> List item -> Element msg
makeMatrix dim scale makeElementWithHeight lst =
    let
        cellSize =
            calcCellSize scale

        (Matrix n m) =
            calcMatrix dim scale

        f =
            makeElementWithHeight (sizeToInt cellSize)

        lstlst =
            lst
                |> List.map f
                |> makeNumColumns n
                |> transpose

        rows =
            lstlst |> List.map (\r -> Element.row [ width fill ] r)
    in
    Element.column [ width fill ] rows


calcPageSize : ScreenDimensions -> CellSize -> Int
calcPageSize dim (CellSize size) =
    dim.w * dim.h // (size * size) * 3


makeNumColumns : Int -> List a -> List (List a)
makeNumColumns num input =
    let
        f : Int -> List a -> List (List a) -> List (List a)
        f n inp acc =
            case inp of
                [] ->
                    acc

                x :: xs ->
                    List.take num (x :: xs) :: f n (List.drop n (x :: xs)) acc
    in
    f num input []


calcCellSize : Scale -> CellSize
calcCellSize scale =
    let
        pixels =
            case scale of
                Micro ->
                    64

                Small ->
                    128

                Medium ->
                    256

                Large ->
                    512
    in
    CellSize pixels


calcMatrix : ScreenDimensions -> Scale -> Matrix
calcMatrix dim scale =
    let
        (CellSize cellSize) =
            calcCellSize scale

        h =
            dim.w // cellSize

        v =
            dim.h // cellSize
    in
    Matrix h v


transpose : List (List a) -> List (List a)
transpose ll =
    case ll of
        [] ->
            []

        [] :: xss ->
            transpose xss

        (x :: xs) :: xss ->
            let
                heads =
                    List.filterMap List.head xss

                tails =
                    List.filterMap List.tail xss
            in
            (x :: heads) :: transpose (xs :: tails)
