#!/bin/bash

set -e

check_dep()
{
  echo "Checking dependencies"
  if ! [ -x "$(which minikube)" ]; then
    echo 'Error: minikube is not installed. see: https://kubernetes.io/docs/tasks/tools/install-minikube/' >&2
    exit 1
  fi

  if ! [ -x "$(which helm)" ]; then
    echo 'Error: helm is not installed. see: https://github.com/helm/helm' >&2
    exit 1
  fi
}

start_minikube()
{
  if minikube status | grep 'minikube: Running' &>/dev/null ; then
    echo 'Minikube is already started.'
  else
    minikube start --memory=8192 --cpus=4
  fi
}

download_istio()
{
  VERSION=$1
  echo "Downloading istio $VERSION"
  cd /tmp
  wget https://github.com/istio/istio/releases/download/$VERSION/istio-$VERSION-linux.tar.gz &>/dev/null
  tar -xf istio-$VERSION-linux.tar.gz &>/dev/null
}

install_istio()
{
  VERSION=$1
  download_istio $VERSION
  cd /tmp/istio-$VERSION
  echo "Installing istio $VERSION"
  kubectl apply -f install/kubernetes/helm/helm-service-account.yaml
  helm init --service-account tiller --wait
  helm install install/kubernetes/helm/istio --name istio --namespace istio-system
}

check_dep
start_minikube
install_istio "1.0.4"
echo "Kubernetes now successfuly setting up"
