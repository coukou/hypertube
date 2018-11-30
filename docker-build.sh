#!/bin/bash

docker build -t hypertube/protos ./protos
docker build -t hypertube/ext-authz ./ext-authz
docker build -t hypertube/auth-service ./services/auth-service
docker build -t hypertube/profile-service ./services/profile-service
docker build -t hypertube/movie-service ./services/movie-service
docker build -t hypertube/hbs-scrapper-service ./services/hbs-scrapper-service
