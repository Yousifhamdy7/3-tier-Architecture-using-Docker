pipeline {
    agent any

    environment {
        REGISTRY = "ghcr.io/yousifhamdy7/3-tier-architecture-using-docker"
    }

    stages {


        stage('Build Docker Images') {
            steps {
                script {
                    sh "docker build -t ${REGISTRY}/frontend:latest ./frontend"
                    sh "docker build -t ${REGISTRY}/backend:latest ./backend"
                    sh "docker build -t ${REGISTRY}/database:latest ./database"
                }
            }
        }

        stage('Login to GHCR') {
            steps {
                withCredentials([string(credentialsId: 'GHCR_TOKEN', variable: 'TOKEN')]) {
                    sh """
                        echo "${TOKEN}" | docker login ghcr.io -u yousifhamdy7 --password-stdin
                    """
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                sh "docker push ${REGISTRY}/frontend:latest"
                sh "docker push ${REGISTRY}/backend:latest"
                sh "docker push ${REGISTRY}/database:latest"
            }
        }

        stage('Extract Real Kubeconfig from Kind') {
            steps {
                script {
                    // Find the Kind control-plane container
                    def controlPlane = sh(
                        script: "docker ps --format '{{.Names}}' | grep 'kind-control-plane'",
                        returnStdout: true
                    ).trim()

                    if (controlPlane == "") {
                        error("No Kind cluster found. Create it using: kind create cluster")
                    }

                    // Copy kubeconfig out of Kind node
                    sh """
                        docker cp ${controlPlane}:/etc/kubernetes/admin.conf ./kubeconfig
                        sed -i 's/127.0.0.1/kind-control-plane/g' ./kubeconfig
                    """

                    // Set env variable for future kubectl commands
                    env.KUBECONFIG = "${WORKSPACE}/kubeconfig"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh """
                        kubectl apply -f k8s/database.yaml
                        kubectl apply -f k8s/backend.yaml
                        kubectl apply -f k8s/frontend.yaml
                        kubectl get pods -A
                    """
                }
            }
        }
    }

    post {
        always {
            sh 'docker logout ghcr.io'
        }
        failure {
            echo "Deployment failed!"
        }
        success {
            echo "Deployment successful!"
        }
    }
}

