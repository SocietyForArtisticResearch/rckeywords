module MainTest exposing (suite)

import Date
import Expect
import Research
import Test exposing (Test, describe, test)
import Time


suite : Test
suite =
    describe "testing the date converter"
        [ test "convert date to iso" <|
            \_ ->
                Research.rcDateToPosix "2012/03/01" |> Expect.equal (Ok (Time.millisToPosix 1330560000000))
        , test "concert date to DieRata" <|
            \_ ->
                Research.rcDateToRataDie "2012/03/01" |> Expect.equal (Ok (Date.fromRataDie 734563))
        ]
