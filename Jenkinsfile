pipeline {
    agent any

    environment {
        REGISTRY = "ghcr.io"
        REPO = "yousifhamdy7/3-tier-architecture-using-docker"  // must be lowercase
        IMAGE_TAG = "latest"
    }

    stages {

        stage('Checkout Code') {
            steps {
                // Jenkins built-in checkout
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                docker build -t $REGISTRY/$REPO/frontend:$IMAGE_TAG ./frontend
                docker build -t $REGISTRY/$REPO/backend:$IMAGE_TAG ./backend
                docker build -t $REGISTRY/$REPO/database:$IMAGE_TAG ./database
                '''
            }
        }

        stage('Login to GHCR') {
            steps {
                // Use Jenkins credentials (kind: Username with password)
                withCredentials([usernamePassword(credentialsId: 'ghcr', usernameVariable: 'USER', passwo]()

