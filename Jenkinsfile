pipeline {
  agent {
    docker {
      image 'docker:24.0.2-cli' // หรือ docker:latest
      args '-v /var/run/docker.sock:/var/run/docker.sock'
    }
  }

    environment {
        IMAGE_NAME = 'worasalid/winston-loki-nodejs'
        CONTAINER_NAME = 'winston-loki-container'
        PORT = '3000'
    }

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'github-creds', url: 'https://github.com/W0rasalid/winston-loki-nodejs.git', branch: 'main'
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
                    echo "🧹 Cleaning up old container..."
                    sh """
                        docker stop ${CONTAINER_NAME} || true
                        docker rm ${CONTAINER_NAME} || true
                    """
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    echo "🚀 Running new container..."
                    sh """
                        docker run -d \
                        --name ${CONTAINER_NAME} \
                        -p ${PORT}:${PORT} \
                        ${IMAGE_NAME}:latest
                    """
                }
            }
        }

        stage('Display ngrok URL') {
            steps {
                script {
                    echo "🌐 If you're running ngrok on port ${PORT}, here's the public URL:"
                    sh "curl -s localhost:4040/api/tunnels | jq -r '.tunnels[0].public_url'"
                }
            }
        }
    }
}
