pipeline {
    agent any
    stages {
        stage('git pull') {
            steps {
                git branch: 'feature/jenkins', credentialsId: 'Capx-Fi', url: 'git@github.com:Capx-Fi/Capx-App-React.git'
                sh 'zip -r capx-app.zip .'

            }
        }
        stage('Push Branch to capx-app AWS ECR Registry') {
            steps {
                sh 'pwd'
                sh 'docker container ls -a'
            }
        }
    }
}