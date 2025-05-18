pipeline {
    agent any

    environment {
        // IMAGE_NAME = "worasalid/winston-loki-nodejs"
        // CONTAINER_NAME = "winston-loki-nodejs-container"
       COMPOSE_FILE = "docker-compose.yml"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    echo "🔨 Building Docker image..."
                    sh "docker build -t ${IMAGE_NAME}:latest ."
                }
            }
        }
        stage('Stop and Remove Old Container') {
            steps {
                script {
                    echo "🛑 Stopping old container if exists..."
                    sh """
                    if [ \$(docker ps -q -f name=${CONTAINER_NAME}) ]; then
                        docker stop ${CONTAINER_NAME}
                        docker rm ${CONTAINER_NAME}
                    fi
                    """
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    echo "▶️ Running new container..."
                    sh "docker run -d --name ${CONTAINER_NAME} -p 3000:3000 ${IMAGE_NAME}:latest"
                }
            }
        }
    }
    post {
        always {
            echo "Pipeline finished."
        }
    }
}
