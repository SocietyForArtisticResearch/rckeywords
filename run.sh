#!/bin/sh
set -e
rm internal_research.json
wget keywords.sarconference2016.net/internal_research.json
elm make src/Main.elm --output=build/main.js
http-server