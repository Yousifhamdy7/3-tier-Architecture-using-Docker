pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "ghcr.io/yousifhamdy7/3-tier-architecture-using-docker/frontend:latest"
        BACKEND_IMAGE  = "ghcr.io/yousifhamdy7/3-tier-architecture-using-docker/backend:latest"
        DATABASE_IMAGE = "ghcr.io/yousifhamdy7/3-tier-architecture-using-docker/database:latest"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git(
                    url: 'https://github.com/Yousifhamdy7/3-tier-Architecture-using-Docker',
                    branch: 'main',
                    credentialsId: 'github'
                )
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t $FRONTEND_IMAGE ./frontend'
                sh 'docker build -t $BACKEND_IMAGE ./backend'
                sh 'docker build -t $DATABASE_IMAGE ./database'
            }
        }

        stage('Login to GHCR') {
            steps {
                withCredentials([string(credentialsId: 'ghcr-token', variable: 'TOKEN')]) {
                    sh 'echo $TOKEN | docker login ghcr.io -u yousifhamdy7 --password-stdin'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                sh 'docker push $FRONTEND_IMAGE'
                sh 'docker push $BACKEND_IMAGE'
                sh 'docker push $DATABASE_IMAGE'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    sh '''
                    kubectl apply -f k8s/
                    kubectl rollout status deployment/frontend
                    kubectl rollout status deployment/backend
                    kubectl rollout status deployment/database
                    kubectl get pods -o wide
                    '''
                }
            }
        }
    }

    post {
        always {
            sh 'docker logout ghcr.io'
        }
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}

