pipeline {
    agent any

    environment {
        DOCKERHUB_USER = credentials('dockerhub-user')
        DOCKERHUB_PASS = credentials('dockerhub-pass')
    }

    stages {

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t myapp-frontend ./frontend'
                sh 'docker build -t myapp-backend ./backend'
                sh 'docker build -t myapp-database ./database'
            }
        }

        stage('Push Images') {
            steps {
                sh """
                echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin
                docker push myapp-frontend
                docker push myapp-backend
                docker push myapp-database
                """
            }
        }

        stage('Deploy to KinD') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}

