pipeline {
    agent any
    environment {
        DOCKER_HOST = 'unix:///var/run/docker.sock'
    }
    stages {
        stage('Checkout') {
            steps {
                git 'git@github.com:<your-username>/3-tier-Architecture-using-Docker.git'
            }
        }
        stage('Build Docker Images') {
            steps {
                sh 'docker build -t frontend:latest ./frontend'
                sh 'docker build -t backend:latest ./backend'
                sh 'docker build -t mysql:latest ./database'
            }
        }
        stage('Deploy to KinD') {
            steps {
                sh 'kubectl apply -f k8s/namespace.yaml'
                sh 'kubectl apply -f k8s/mysql-deployment.yaml'
                sh 'kubectl apply -f k8s/backend-deployment.yaml'
                sh 'kubectl apply -f k8s/frontend-deployment.yaml'
                sh 'kubectl apply -f k8s/mysql-service.yaml'
                sh 'kubectl apply -f k8s/backend-service.yaml'
                sh 'kubectl apply -f k8s/frontend-service.yaml'
                sh 'kubectl apply -f k8s/ingress.yaml'
            }
        }
    }
}

