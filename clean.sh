#!/bin/bash

kubectl delete -f k8s/hypertube-gateway.yaml
kubectl delete -f k8s/egress

kubectl delete -f k8s/auth-svc/envoy-filter.yaml
kubectl delete -f k8s/auth-svc/mongo.yaml
kubectl delete -f <(istioctl kube-inject -f k8s/auth-svc/service.yaml)

kubectl delete -f k8s/profile-svc/envoy-filter.yaml
kubectl delete -f k8s/profile-svc/mongo.yaml
kubectl delete -f <(istioctl kube-inject -f k8s/profile-svc/service.yaml)

kubectl delete -f k8s/library-svc/envoy-filter.yaml
kubectl delete -f k8s/library-svc/mongo.yaml
kubectl delete -f <(istioctl kube-inject -f k8s/library-svc/service.yaml)
