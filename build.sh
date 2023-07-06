#!/bin/sh

rm internal_research.json
wget keywords.sarconference2016.net/internal_research.json
elm make src/Main.elm --output=build/main.js
elm make src/Worker.elm --output=build/elm-worker.js
