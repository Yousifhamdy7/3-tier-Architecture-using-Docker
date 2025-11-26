pipeline {
    agent any

    environment {
        REGISTRY = "ghcr.io/yousifhamdy7/3-tier-architecture-using-docker"
        IMAGE_TAG = "latest"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/Yousifhamdy7/3-tier-Architecture-using-Docker',
                        credentialsId: 'github'    // ✅ FIXES GIT AUTH ERROR
                    ]]
                ])
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'ghcr',        // ✅ FIX THIS IN JENKINS
                    usernameVariable: 'USER',
                    passwordVariable: 'TOKEN'
                )]) {
                    sh """
                        echo $TOKEN | docker login ghcr.io -u $USER --password-stdin
                    """
                }
            }
        }

        stage('Build Images') {
            steps {
                sh "docker build -t ${REGISTRY}/frontend:${IMAGE_TAG} ./frontend"
                sh "docker build -t ${REGISTRY}/backend:${IMAGE_TAG} ./backend"
                sh "docker build -t ${REGISTRY}/database:${IMAGE_TAG} ./database"
            }
        }

        stage('Push Images') {
            steps {
                sh "docker push ${REGISTRY}/frontend:${IMAGE_TAG}"
                sh "docker push ${REGISTRY}/backend:${IMAGE_TAG}"
                sh "docker push ${REGISTRY}/database:${IMAGE_TAG}"
            }
        }

        stage('Setup Kubeconfig') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KCFG')]) {
                    sh """
                        mkdir -p ~/.kube
                        cp $KCFG ~/.kube/config
                        chmod 600 ~/.kube/config
                        echo 'Kubeconfig installed'
                    """
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh """
                    kubectl apply -f k8s/
                    kubectl get pods -A
                """
            }
        }
    }

    post {
        always {
            sh 'docker logout ghcr.io || true'
        }
        success {
            echo "🎉 Deployment successful!"
        }
        failure {
            echo "❌ Deployment failed!"
        }
    }
}

