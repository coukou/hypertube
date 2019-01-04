#!/bin/bash

docker build -t hypertube/protos ./protos
docker build -t hypertube/ext-authz ./ext-authz
docker build -t hypertube/auth-service ./services/auth-service
docker build -t hypertube/profile-service ./services/profile-service
docker build -t hypertube/library-service ./services/library-service
docker build -t hypertube/avatar-service ./services/avatar-service
docker build -t hypertube/hbs-scrapper-service ./services/hbs-scrapper-service
docker build -t hypertube/shana-scrapper-service ./services/shana-scrapper-service
docker build -t hypertube/streaming-service ./services/streaming-service
