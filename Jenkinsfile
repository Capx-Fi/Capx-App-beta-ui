pipeline {
    agent any
    stages {
        stage('git pull') {
            steps {
                git branch: 'feature/jenkins', credentialsId: 'Capx-Fi', url: 'git@github.com:Capx-Fi/Capx-App-React.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm ci --legacy-peer-deps'
            }
        }
        stage('Copy ENV file') {
            steps {
                sh 'cp /home/ubuntu/env/.env .'
                sh 'ls -a'
            }
        }
        stage('Build App') {
            steps {
                sh 'npm run build'
            }
        }
        stage("Tag & Push") {
            steps {
                sh 'aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 296324153710.dkr.ecr.us-east-1.amazonaws.com'
                sh 'docker build -t capx-app .'
                sh 'docker tag capx-app:latest 296324153710.dkr.ecr.us-east-1.amazonaws.com/capx-app:valhala'
                sh 'docker push 296324153710.dkr.ecr.us-east-1.amazonaws.com/capx-app:valhala'
            }
        }
    }
}