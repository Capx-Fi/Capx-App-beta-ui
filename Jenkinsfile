pipeline {
    agent any
    stages {
        stage('git pull') {
            steps {
                git branch: 'feature/jenkins', credentialsId: 'Capx-Fi', url: 'git@github.com:Capx-Fi/Capx-App-React.git'
                sh 'zip -r capx-app.zip .'

            }
        }
        stage('Build capx-app AWS ECR Registry') {
            steps {
                sh 'docker build -t capx-app .'
            }
        }
        stage("Tag & Push") {
            steps {
                sh 'docker tag capx-app:latest 296324153710.dkr.ecr.us-east-1.amazonaws.com/capx-app:latest'
                sh 'docker push 296324153710.dkr.ecr.us-east-1.amazonaws.com/capx-app:latest'
            }
        }
    }
}