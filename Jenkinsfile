pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                sh '''
                rm -rf /var/www/express-frontend/*
                cp -r $WORKSPACE/* /var/www/express-frontend/
                cd /var/www/express-frontend
                npm install --production
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
