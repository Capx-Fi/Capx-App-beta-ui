pipeline {
    agent any
    stages {
        stage('git pull') {
            steps {
                git branch: 'feature/jenkins', credentialsId: 'Capx-Fi', url: 'git@github.com:Capx-Fi/Capx-App-React.git'
                sh 'zip -r capx-app.zip .'
            }
        }
        stage('Push Branch to capx-app') {
            steps {
                sh 'echo "Stopping Docker Container"'
                sshPublisher(publishers: [sshPublisherDesc(configName: 'capxapp', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '''if [ -d "/home/ubuntu/capx-app" ]; then cd /home/ubuntu/capx-app ; sudo docker-compose down ; fi''', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
                sh 'echo "Removing capx-app"'
                sshPublisher(publishers: [sshPublisherDesc(configName: 'capxapp', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: 'rm -rf capx-app', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
                sh 'echo "create capx-app backend directory"'
                sshPublisher(publishers: [sshPublisherDesc(configName: 'capxapp', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: 'mkdir capx-app', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
                sh 'echo "copy zip from jenkins"'
                sshPublisher(publishers: [sshPublisherDesc(configName: 'capxapp', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: 'capx-app.zip')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
                sh 'echo "unzip capx ui"'
                sshPublisher(publishers: [sshPublisherDesc(configName: 'capxapp', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: 'unzip /home/ubuntu/capx-app.zip -d /home/ubuntu/capx-app', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
                sh 'echo "Copying Environment File"'
                sshPublisher(publishers: [sshPublisherDesc(configName: 'capxapp', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: 'cd /home/ubuntu/env/ ; cp test.env ./capx-app/.env', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }
        }
        stage('Build capx-app Backend in capx-app') {
            steps {
                sh 'echo "building capx-app"'
                sshPublisher(publishers: [sshPublisherDesc(configName: 'capxapp', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: 'cd /home/ubuntu/capx-app/ ; sudo docker-compose build', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }
        }
        stage('Starting capx-app') {
            steps {
                sh 'echo "Bringing up capx-app"'
                sshPublisher(publishers: [sshPublisherDesc(configName: 'capxapp', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: 'cd /home/ubuntu/capx-app/ ; sudo docker-compose up -d ', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }
        }
    }
}