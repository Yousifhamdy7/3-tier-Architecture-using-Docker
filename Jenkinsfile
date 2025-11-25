pipeline {
    agent any
    environment {
        // Docker registry
        REGISTRY = 'ghcr.io/yousifhamdy7/3-tier-architecture-using-docker'
    }
    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/Yousifhamdy7/3-tier-Architecture-using-Docker', branch: 'main', credentialsId: 'github'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh 'export DOCKER_BUILDKIT=1'
                    sh 'docker build -t $REGISTRY/frontend:latest ./frontend'
                    sh 'docker build -t $REGISTRY/backend:latest ./backend'
                    sh 'docker build -t $REGISTRY/database:latest ./database'
                }
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
                sh 'docker push $REGISTRY/frontend:latest'
                sh 'docker push $REGISTRY/backend:latest'
                sh 'docker push $REGISTRY/database:latest'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    sh '''
                        export KUBECONFIG=$KUBECONFIG
                        kubectl get nodes
                        kubectl apply -f k8s/
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
            echo 'Deployment succeeded!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}

