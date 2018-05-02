#!/bin/bash

set -e # fail fast

echo "== Pushing docker container to dockerhub"

docker push gapoorva/riyag.com

echo "== Deploy successful!"