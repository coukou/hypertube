#!/bin/bash

kubectl apply -f k8s/hypertube-gateway.yaml
kubectl apply -f k8s/egress

kubectl apply -f k8s/auth-svc/envoy-filter.yaml
kubectl apply -f k8s/auth-svc/mongo.yaml
kubectl apply -f <(istioctl kube-inject -f k8s/auth-svc/service.yaml)

kubectl apply -f k8s/profile-svc/envoy-filter.yaml
kubectl apply -f k8s/profile-svc/mongo.yaml
kubectl apply -f <(istioctl kube-inject -f k8s/profile-svc/service.yaml)

kubectl apply -f k8s/library-svc/envoy-filter.yaml
kubectl apply -f k8s/library-svc/mongo.yaml
kubectl apply -f <(istioctl kube-inject -f k8s/library-svc/service.yaml)
