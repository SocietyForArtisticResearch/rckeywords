#!/bin/sh

rm internal_research.json
wget keywords.sarconference2016.net/internal_research.json
elm-optimize-level-2 --optimize-speed src/Main.elm --output=build/main.js

set -e

js="build/main.js"
min="build/main.js"

uglifyjs $js --compress 'pure_funcs="F2,F3,F4,F5,F6,F7,F8,F9,A2,A3,A4,A5,A6,A7,A8,A9",pure_getters,keep_fargs=false,unsafe_comps,unsafe' | uglifyjs --mangle --output $min

echo "Compiled size:$(cat $js | wc -c) bytes  ($js)"
echo "Minified size:$(cat $min | wc -c) bytes  ($min)"
echo "Gzipped size: $(cat $min | gzip -c | wc -c) bytes"