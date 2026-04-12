pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/NileshKakliji-cloud/express-frontend-jenkins.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                cd /var/www/express-frontend
                sudo chown -R ubuntu:ubuntu /var/www/express-frontend
                npm install
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                cd /var/www/express-frontend
                pm2 delete express-frontend || true
                pm2 start server.js --name express-frontend
                pm2 save
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                sleep 5
                curl -f http://localhost:3000
                '''
            }
        }
    }
}
