# Hypertube

Pre-requis:
 - [minikube](https://kubernetes.io/docs/setup/minikube/#installation)
 - [helm](https://github.com/helm/helm/releases)
 - [node](https://nodejs.org/en/download)
 - [npm](https://www.npmjs.com/get-npm)

# Comment mettre en route l'usine (backend)

```bash
# En premier on lance un script qui setup minikube avec helm et istio
./init-k8s.sh

# On rajoute les variables environement de la machine docker de minikube
eval $(minikube docker-env)

# On execute un script qui va build toutes nos images docker
./docker-build.sh

# On deploy notre backend
./deploy.sh

# Pour clean notre deploiment
./clean.sh
```

# Frontend

```bash
# On entre dans le dossier de notre front
cd frontend

# ce script creer un container avec comme image hypertube/protos
# et copie en local les fichiers necessaire pour communiquer
# avec notre api GRPC-web
./update-protos.sh

# on install les dependances
npm install

# on lance le serveur en mode dev
npm run serve
```
