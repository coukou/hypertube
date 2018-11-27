#!/usr/bin/env bash

OUT_DIR=generated/js

GTOOLS=./node_modules/.bin/grpc_tools_node_protoc
GTOOLS_PLUGIN=./node_modules/.bin/grpc_tools_node_protoc_plugin

mkdir -p $OUT_DIR

build()
{
  FILE=$1

  $GTOOLS $FILE \
    --js_out=import_style=commonjs:$OUT_DIR \
    --grpc-web_out=import_style=commonjs,mode=grpcwebtext:$OUT_DIR \
    --grpc_out=$OUT_DIR --plugin=$GTOOLS_PLUGIN
}

build auth/auth.proto
build profile/profile.proto
build movie/movie.proto
