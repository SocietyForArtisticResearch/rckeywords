module MainTest exposing (..)

import Expect exposing (Expectation)
import Fuzz exposing (Fuzzer, int, list, string)
import Test exposing (..)
import Research

import Time exposing (Posix)


suite : Test
suite =
    describe "testing the date converter"
    [ 
        test "convert date to iso" <| \_ -> 
            Research.rcDateToPosix "2012/03/01" |> Expect.equal (Ok (Time.millisToPosix 1330560000000))
    ]