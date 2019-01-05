#!/bin/bash

kubectl delete -f k8s/auth-svc/service.yaml
kubectl apply -f <(istioctl kube-inject -f k8s/auth-svc/service.yaml)

#kubectl delete -f k8s/profile-svc/service.yaml
#kubectl apply -f <(istioctl kube-inject -f k8s/profile-svc/service.yaml)

#kubectl delete -f k8s/library-svc/service.yaml
#kubectl apply -f <(istioctl kube-inject -f k8s/library-svc/service.yaml)

#kubectl delete -f k8s/avatar-svc/service.yaml
#kubectl apply -f <(istioctl kube-inject -f k8s/avatar-svc/service.yaml)

