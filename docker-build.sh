#!/bin/bash

docker build -t hypertube/service-proxy ./service-proxy/envoy
docker build -t hypertube/service-proxy-authz ./service-proxy/ext-authz
docker build -t hypertube/auth-service ./services/auth-service
