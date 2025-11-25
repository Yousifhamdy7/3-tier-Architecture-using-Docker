pipeline {
    agent any

    environment {
        REGISTRY = "ghcr.io"
        REPO = "yousifhamdy7/3-tier-architecture-using-docker"
        IMAGE_TAG = "latest"
    }

    stages {

        stage('Checkout Code') {
            steps {
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
                withCredentials([usernamePassword(
                    credentialsId: 'ghcr', 
                    usernameVariable: 'USER', 
                    passwordVariable: 'TOKEN'
                )]) {
                    sh 'echo $TOKEN | docker login $REGISTRY -u $USER --password-stdin'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                sh '''
                docker push $REGISTRY/$REPO/frontend:$IMAGE_TAG
                docker push $REGISTRY/$REPO/backend:$IMAGE_TAG
                docker push $REGISTRY/$REPO/database:$IMAGE_TAG
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KCFG')]) {
                    sh '''
                    export KUBECONFIG=$KCFG
                    kubectl apply -f k8s/
                    '''
                }
            }
        }
    }

    post {
        always {
            sh 'docker logout $REGISTRY'
        }
    }
}

