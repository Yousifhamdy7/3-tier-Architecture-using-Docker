This project implements a complete 3-tier application (Frontend, Backend, Database) deployed using:

Docker & Docker Compose

Kubernetes (Kind cluster)

CI/CD Pipeline using Jenkins

The goal is to demonstrate a real DevOps workflow from development → containerization → CI/CD → GitOps deployment.
Features

✔ 3-tier stack (Frontend + Backend + Database)
✔ Containerized using Docker
✔ Orchestrated with Kubernetes
✔ Automated build & deploy using Jenkins
✔ Production-ready folder structure
Run the whole 3-tier system locally:

docker-compose up --build


Services included:

Frontend (React + Nginx)

Backend (Node.js)

MySQL Database
Apply all k8s resources:

kubectl apply -f k8s/


This deploys:

Frontend Deployment + Service

Backend Deployment + Service

MySQL StatefulSet + PVC

Ingress
CI/CD with Jenkins

Pipeline steps:

Checkout the repository

Build Docker images

Login to GHCR

Push images

Extract real Kubeconfig from Kind cluster

Deploy to Kubernetes
Add Prometheus + Grafana monitoring

Add EFK/ELK logging stack

Add TLS with Cert-Manager

Add autoscaling (HPA)

Add service mesh (Istio)
