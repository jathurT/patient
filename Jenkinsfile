pipeline {
    agent any
    
    tools {
        nodejs 'Node.js 20.9.0'
    }
    
    parameters {
        choice(name: 'DEPLOY_ENV', choices: ['staging', 'production'], description: 'Select deployment environment')
    }
    
    environment {
        EC2_USER = 'ubuntu'
        EC2_HOST = credentials('ec2-host')
        APP_NAME = 'user-frontend'
        DEPLOY_PATH = '/var/www/html'  
        DEPLOY_ENV = "${params.DEPLOY_ENV ?: 'staging'}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Build') {
            steps {
                // Use the environment file that's already in the repo
                sh 'npm run build'
                sh 'ls -la ./dist' // Verify the build output
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    def buildDir = './dist'
                    
                    if (!fileExists(buildDir)) {
                        error "Build directory not found. Check your build process."
                    }
                    
                    if (!fileExists("${buildDir}/index.html")) {
                        error "index.html is missing from build directory. Deployment aborted."
                    }
                    
                    sshagent(['ec2-ssh-key']) {
                        // Create a tar file of the build
                        sh "tar -czf user-build.tar.gz -C ${buildDir} ."
                        
                        // Copy it to the EC2 instance
                        sh "scp -o StrictHostKeyChecking=no user-build.tar.gz ${EC2_USER}@${EC2_HOST}:/tmp/"
                        
                        // Extract and deploy on EC2 with better error handling
                        sh """
                            ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
                                set -e  # Exit on any error
                                
                                echo "Backing up existing user site if it exists..."
                                # Create a backup directory
                                sudo mkdir -p ${DEPLOY_PATH}_backup_$(date +%Y%m%d%H%M%S)
                                
                                # Copy only non-admin files to backup
                                sudo find ${DEPLOY_PATH}/ -mindepth 1 -not -path "${DEPLOY_PATH}/admin*" -exec cp -r {} ${DEPLOY_PATH}_backup_$(date +%Y%m%d%H%M%S)/ \\; || true
                                
                                echo "Cleaning existing site (preserving admin)..."
                                sudo find ${DEPLOY_PATH}/ -mindepth 1 -not -path "${DEPLOY_PATH}/admin*" -delete
                                
                                echo "Extracting new build..."
                                sudo mkdir -p ${DEPLOY_PATH}
                                sudo tar -xzf /tmp/user-build.tar.gz -C ${DEPLOY_PATH}/
                                
                                echo "Setting permissions..."
                                sudo chmod -R 755 ${DEPLOY_PATH}
                                sudo chown -R www-data:www-data ${DEPLOY_PATH}
                                # Make sure admin directory permissions are maintained
                                if [ -d "${DEPLOY_PATH}/admin" ]; then
                                    sudo chmod -R 755 ${DEPLOY_PATH}/admin
                                    sudo chown -R www-data:www-data ${DEPLOY_PATH}/admin
                                fi
                                
                                echo "Cleaning up..."
                                rm /tmp/user-build.tar.gz
                                
                                echo "Reloading Nginx..."
                                sudo systemctl reload nginx
                                
                                echo "Deployment complete!"
                            '
                        """
                    }
                }
            }
        }
        
        stage('Verify Deployment') {
            steps {
                script {
                    sshagent(['ec2-ssh-key']) {
                        sh """
                            echo "Verifying deployment..."
                            ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
                                if [ -f "${DEPLOY_PATH}/index.html" ]; then
                                    echo "Deployment verified: index.html exists"
                                    
                                    # Also verify admin site is still intact
                                    if [ -d "${DEPLOY_PATH}/admin" ] && [ -f "${DEPLOY_PATH}/admin/index.html" ]; then
                                        echo "Admin site is intact"
                                    else
                                        echo "Warning: Admin site may be missing or incomplete"
                                    fi
                                    
                                    exit 0
                                else
                                    echo "Deployment verification failed: index.html not found"
                                    exit 1
                                fi
                            '
                        """
                    }
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        failure {
            script {
                echo 'The user frontend pipeline failed. Check the build logs for details.'
                sshagent(['ec2-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
                            if [ -d "${DEPLOY_PATH}_backup_*" ]; then
                                echo "Restoring from backup..."
                                sudo find ${DEPLOY_PATH}/ -mindepth 1 -not -path "${DEPLOY_PATH}/admin*" -delete || true
                                sudo cp -r \$(ls -td ${DEPLOY_PATH}_backup_* | head -1)/* ${DEPLOY_PATH}/
                                sudo systemctl reload nginx
                                echo "Restored from backup"
                            fi
                        '
                    """
                }
            }
        }
        success {
            echo 'Successfully built and deployed the user frontend application.'
        }
    }
}