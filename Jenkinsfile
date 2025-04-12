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
        
        stage('Prepare Deployment') {
            steps {
                script {
                    def buildDir = './dist'
                    
                    if (!fileExists(buildDir)) {
                        error "Build directory not found. Check your build process."
                    }
                    
                    if (!fileExists("${buildDir}/index.html")) {
                        error "index.html is missing from build directory. Deployment aborted."
                    }
                    
                    // Create a tar file of the build
                    sh "tar -czf user-build.tar.gz -C ${buildDir} ."
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    sshagent(['ec2-ssh-key']) {
                        // Copy the build to the EC2 instance
                        sh "scp -o StrictHostKeyChecking=no user-build.tar.gz ${EC2_USER}@${EC2_HOST}:/tmp/"
                        
                        // Extract and deploy on EC2 with improved error handling
                        sh """
                            ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
                                set -ex  # Exit on any error and print commands
                                
                                # Verify deployment path exists
                                sudo mkdir -p ${DEPLOY_PATH}
                                
                                # Check for admin directory
                                echo "Checking for admin directory..."
                                if [ -d "${DEPLOY_PATH}/admin" ]; then
                                    echo "Admin directory exists"
                                    # Check if it contains critical files
                                    if [ -f "${DEPLOY_PATH}/admin/index.html" ]; then
                                        echo "Admin site appears valid"
                                    else
                                        echo "WARNING: Admin directory exists but may be incomplete"
                                    fi
                                else
                                    echo "No admin directory found - will be created if needed later"
                                fi
                                
                                echo "Creating backup directory..."
                                BACKUP_DIR="${DEPLOY_PATH}_backup_$(date +%Y%m%d%H%M%S)"
                                sudo mkdir -p $BACKUP_DIR
                                
                                echo "Backing up existing user site (excluding admin)..."
                                # Exclude admin directory from backup - only back up user site files
                                sudo find ${DEPLOY_PATH}/ -mindepth 1 -maxdepth 1 -not -path "${DEPLOY_PATH}/admin" -exec cp -r {} $BACKUP_DIR/ \\; || echo "No files to backup or backup failed"
                                
                                echo "Removing existing user site files (preserving admin)..."
                                sudo find ${DEPLOY_PATH}/ -mindepth 1 -maxdepth 1 -not -path "${DEPLOY_PATH}/admin" -exec rm -rf {} \\; || echo "No files to remove or removal failed"
                                
                                echo "Extracting new user site build..."
                                sudo tar -xzf /tmp/user-build.tar.gz -C ${DEPLOY_PATH}/
                                
                                # Verify extraction succeeded
                                if [ ! -f "${DEPLOY_PATH}/index.html" ]; then
                                    echo "ERROR: Extraction failed - index.html not found"
                                    # Attempt to restore from backup
                                    echo "Attempting to restore from backup..."
                                    sudo cp -r $BACKUP_DIR/* ${DEPLOY_PATH}/ || echo "Restore failed"
                                    exit 1
                                fi
                                
                                echo "Setting user site permissions..."
                                sudo chmod -R 755 ${DEPLOY_PATH}
                                sudo chown -R www-data:www-data ${DEPLOY_PATH}
                                
                                # Make sure admin directory permissions are properly set
                                if [ -d "${DEPLOY_PATH}/admin" ]; then
                                    echo "Setting admin directory permissions..."
                                    sudo chmod -R 755 ${DEPLOY_PATH}/admin
                                    sudo chown -R www-data:www-data ${DEPLOY_PATH}/admin
                                fi
                                
                                echo "Cleaning up..."
                                sudo rm -f /tmp/user-build.tar.gz
                                
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
                                set -e
                                
                                echo "Checking for index.html..."
                                if [ -f "${DEPLOY_PATH}/index.html" ]; then
                                    echo "User site verified: index.html exists"
                                else
                                    echo "ERROR: User site verification failed - index.html not found"
                                    exit 1
                                fi
                                
                                # Check admin site if it should exist
                                if [ -d "${DEPLOY_PATH}/admin" ]; then
                                    echo "Checking admin site integrity..."
                                    if [ -f "${DEPLOY_PATH}/admin/index.html" ]; then
                                        echo "Admin site verified: admin/index.html exists"
                                    else
                                        echo "WARNING: Admin directory exists but index.html is missing"
                                    fi
                                else
                                    echo "No admin site found - this may be expected if not deployed yet"
                                fi
                                
                                # Verify Nginx configuration
                                echo "Checking Nginx configuration..."
                                sudo nginx -t
                                
                                # Test that the site is accessible via curl (local test)
                                echo "Testing local access to user site..."
                                curl -s -o /dev/null -w "%{http_code}" http://localhost | grep -q "200" && echo "User site responding with 200 OK" || echo "Warning: User site not accessible locally"
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
                echo 'The user frontend pipeline failed. Attempting to recover from backup...'
                sshagent(['ec2-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
                            set -e
                            
                            echo "Looking for recent backups..."
                            LATEST_BACKUP=\$(ls -td ${DEPLOY_PATH}_backup_* | head -1)
                            
                            if [ -n "\$LATEST_BACKUP" ] && [ -d "\$LATEST_BACKUP" ]; then
                                echo "Found backup at \$LATEST_BACKUP, restoring..."
                                
                                # Preserve admin directory if it exists
                                if [ -d "${DEPLOY_PATH}/admin" ]; then
                                    echo "Temporarily moving admin directory..."
                                    sudo mv ${DEPLOY_PATH}/admin /tmp/admin_backup || echo "Failed to move admin dir"
                                fi
                                
                                # Remove current broken deployment (excluding admin which we moved)
                                echo "Removing current deployment..."
                                sudo find ${DEPLOY_PATH}/ -mindepth 1 -not -path "${DEPLOY_PATH}/admin" -delete || echo "Failed to clean current deployment"
                                
                                # Restore from backup
                                echo "Copying backup files..."
                                sudo cp -r \$LATEST_BACKUP/* ${DEPLOY_PATH}/ || echo "Failed to restore backup"
                                
                                # Move admin directory back if we saved it
                                if [ -d "/tmp/admin_backup" ]; then
                                    echo "Restoring admin directory..."
                                    sudo mv /tmp/admin_backup ${DEPLOY_PATH}/admin || echo "Failed to restore admin dir"
                                fi
                                
                                # Fix permissions
                                echo "Setting permissions..."
                                sudo chmod -R 755 ${DEPLOY_PATH}
                                sudo chown -R www-data:www-data ${DEPLOY_PATH}
                                
                                echo "Reloading Nginx..."
                                sudo systemctl reload nginx
                                
                                echo "Restored from backup"
                            else
                                echo "No suitable backup found for restoration"
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