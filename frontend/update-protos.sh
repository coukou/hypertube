#!/bin/bash

NAME='tmp-protos-container'
rm -rf ./src/protos
docker create --name $NAME hypertube/protos
docker cp $NAME:/protos/generated/js ./src/protos
docker rm $NAME
