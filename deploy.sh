#!/bin/sh

sh build-opt.sh
cp -v -r build/main.js ../rckeywordsdeploy/build/main.js
cp -v -r build/worker.js ../rckeywordsdeploy/build/worker.js
cp -v -r build/elm-worker.js ../rckeywordsdeploy/build/elm-worker.js
cp -v index.html ../rckeywordsdeploy

