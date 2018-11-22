#!/usr/bin/env bash

docker build -t hypertube/proto-builder .

mkdir -p generated/js

docker run -v $(pwd)/generated:/generated hypertube/proto-builder ./node_modules/.bin/grpc_tools_node_protoc auth/auth.proto \
--js_out=import_style=commonjs:/generated/js \
--grpc-web_out=import_style=commonjs,mode=grpcwebtext:/generated/js \
--grpc_out=/generated/js --plugin=./node_modules/.bin/grpc_tools_node_protoc_plugin
