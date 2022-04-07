# microservices
To run locally:
1. Install k8s cluster (minikube etc.)
2. Install ingress addon for minikube
3. Minikube start
4. kubectl create secret generic jwt-secret --from-literal=JWT_KEY=randomKeyString