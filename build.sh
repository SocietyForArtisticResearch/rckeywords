#!/bin/sh

elm make src/Main.elm --output=build/main.js
elm make src/Worker.elm --output=build/elm-worker.js
