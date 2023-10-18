module Series exposing (series)

import Array
import Random
import Random.List


series : Int -> Int -> Array.Array Int
series size startSeed =
    let
        range =
            List.range 0 size

        generator =
            Random.List.shuffle range

        ( result, _ ) =
            Random.initialSeed startSeed |> Random.step generator
    in
    result |> Array.fromList
