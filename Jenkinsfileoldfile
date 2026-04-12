pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/NileshKaklij-cloud/express-frontend-jenkins.git'
            }
        }
        stage('Install') {
            steps {
                sh '''
                    cp -r ${WORKSPACE}/* /var/www/express-frontend/
                    cd /var/www/express-frontend
                    npm install --only=production
                '''
            }
        }
        stage('Deploy') {
            steps {
                sh '''
                    cd /var/www/express-frontend
                    pm2 delete express-frontend 2>/dev/null || true
                    pm2 start server.js --name express-frontend
                    pm2 save
                '''
            }
        }
        stage('Health Check') {
            steps {
                sh '''
                    sleep 5
                    curl -f http://localhost:3000/health
                    echo "Express healthy!"
                '''
            }
        }
    }
    post {
        success { echo 'Express deployed!' }
        failure { echo 'Express failed!' }
    }
}
