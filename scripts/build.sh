#!/bin/bash

set -e # fail fast

echo "== Cleaning out old dist directory..."

rm -rf dist

echo "== Removing past build containers..."

BUILDER_IMAGE="riyag.com-builder"
BUILDER_CONTAINER="riyag.com-builder-last-run"
EXISTING_CONTAINERS=$(docker ps -a -q -f ancestor=$BUILDER_IMAGE)

echo "== Removing past builder image..."

[[ !  -z  $EXISTING_CONTAINERS  ]] && docker rm $(docker stop $EXISTING_CONTAINERS)
docker rmi $BUILDER_IMAGE

echo "== Constructing build image..."

docker build -f build.Dockerfile --tag="riyag.com-builder" .

echo "== Running image to create dist directory..."

mkdir dist
pwd=$(pwd)
docker run -it --name="$BUILDER_CONTAINER" \
    -v "$pwd/dist:/home/default/dist" \
    riyag.com-builder 

echo "== Constructing deploy image..."

docker build -f deploy.Dockerfile --tag="gapoorva/riyag.com" .

echo "== Build Completed!"