 pipeline 
 {
   agent any
   stages 
   {
    /*stage('Build npm package') 
    {
     when 
     {
       expression{params.ENVIRONMENT == "dev/int"}
     }
     agent 
     {
      docker {
          args "--user root --memory 1g"
          image 'node:14.7.0'
          reuseNode true
        }
      }
            steps {
             sh 'npm config set proxy http://security-proxy.emea.svc.corpintra.net:3128'
             sh 'npm config set https-proxy http://security-proxy.emea.svc.corpintra.net:3128'
             sh 'npm install'
            
            }
     }*/
    
    /*stage('Scan with Blackduck')
	 {
		 steps 
	          {
         println "bladuckscan started"
         withCredentials([string(credentialsId: 'BLACKDUCK_CREDENTIALID', variable: 'BD_TOKEN')])
         { //set SECRET with the credential content
          sh "java -jar /home/tenant/synopsys-detect/download/synopsys-detect-7.14.0.jar --blackduck.url=https://bdscan.i.mercedes-benz.com --blackduck.api.token='${BD_TOKEN}' --blackduck.trust.cert=true --detect.timeout='300' --detect.project.name=\"Untangle\" --detect.project.version.name='1.0' --detect.code.location.name=\"Untangle-1.0\""      
         }
         }  
	 }
    stage('Scan with SonarQube') 
    {
    if (environment != "prod")
    {
      def scannerHome = tool 'SonarScanner';
      withSonarQubeEnv('VPP Sonar')
      {
        sh "${scannerHome}/bin/sonar-scanner"
      }    
    }
  }
       stage('SonarQube analysis') {
                                when {
            expression{params.ENVIRONMENT == "dev/int"}
         }
       steps {
         script {
            if ( params.ENVIRONMENT == "dev/int" ) {
             def scannerHome = tool 'DOT-Sonar';
             withSonarQubeEnv('DOT-Sonar') {
               sh "${scannerHome}/bin/sonar-scanner \
				    -Dsonar.login=1539150c52c167928f05f879afa537f268f62305 \
					-Dsonar.host.url=https://gtdadap-sonar.dot.i.mercedes-benz.com/  \
                    -Dsonar.projectKey=com.daimler.starc.zula:star-zula-adapter \
					-Dsonar.java.binaries=target/classes \
                    -Dsonar.projectName=reactapp"
             }
         }
                 else {
            echo "Selected environment ${params.ENVIRONMENT} is not DEV/INT, hence skipping this step "
         } 
       }
     }
     }*/ 
     stage('Build and Push Docker Image') {
      when {
            expression{params.ENVIRONMENT == "dev/int"}
           }
       steps {
         script {                  
	    docker.withRegistry('http://registry.app.corpintra.net', 'HARBOR_LOGIN')
            {		    
             sh 'docker build -t registry.app.corpintra.net/untangle/mb-qa-client:$TAG_NAME .'
             sh 'docker images | grep $TAG_NAME'
    	     sh 'docker push registry.app.corpintra.net/untangle/mb-qa-client:$TAG_NAME'
	    }
         }
       }
     }

     stage('harbor image check Dev/Int') {
     when {
            expression{params.ENVIRONMENT == "dev/int"}
         }
       steps {
        script {
		docker.withRegistry('http://registry.app.corpintra.net', 'HARBOR_LOGIN')
            {
           sh 'docker rmi registry.app.corpintra.net/untangle/mb-qa-client:$TAG_NAME'
           sh 'docker pull registry.app.corpintra.net/untangle/mb-qa-client:$TAG_NAME'
             def imagecheck = sh( 
                                   script: 'docker images -q registry.app.corpintra.net/untangle/mb-qa-client:\${TAG_NAME}',
                                   returnStdout: true
                                )
              if ( "${imagecheck}" != '' ) {
                        echo "Image registry.app.corpintra.net/untangle/mb-qa-client:$TAG_NAME exists. Proceeding...."
                                            } 
              else {
                         echo "Image registry.app.corpintra.net/untangle/mb-qa-client:$TAG_NAME NOT FOUND. Aborting...."
                         error "This pipeline stops here!"
                   }
	    }
       }
     }
    }
     stage('Deploy to DHC CaaS DEV') {
     when {
            expression{params.ENVIRONMENT == "dev/int"}
          }
       steps {
         script {
           
             withCredentials([file(credentialsId: "c51p138.kubeconfig", variable: 'KUBE_CFG_FILE')]) {
               sh "export KUBECONFIG=${KUBE_CFG_FILE};kubectl get ns;helm upgrade --install --namespace qa-platform mb-qa-client --set image.tag=$TAG_NAME helm -f helm/values-dev.yaml"
               sh "kubectl rollout restart --kubeconfig $KUBE_CFG_FILE deploy mb-qa-client -n qa-platform"
	     }
         }
       }
       post {
         success {
           script {
            if ( params.ENVIRONMENT == "dev/int" ) {
                   mail to: "indranil.biswas@mercedes-benz.com",
                        cc: "soumitra.nath@mercedes-benz.com",
                        bcc: " ",
                        from: "GTD-DOT@daimler.com",
                        replyTo: "",
                        subject: "${env.JOB_NAME}: DEV DEPLOYMENT COMPLETED", 
                        body: "Hello All,\n\n The build for the ${env.JOB_NAME} completed successfully on DEV.\nBuild console output can be checked using the URL ${env.BUILD_URL}/console  \n\nWarm Regards,\nJenkins "
         }
         }
         }
         failure {
                        script {
            if ( params.ENVIRONMENT == "dev/int" ) {
                   mail to: "indranil.biswas@mercedes-benz.com",
                        cc: "soumitra.nath@mercedes-benz.com",
                        bcc: " ",
                        from: "GTD-DOT@daimler.com",
                        replyTo: "",
                        subject: "${env.JOB_NAME}: DEV DEPLOYMENT FAILED", 
                        body: "Hello All,\n\n The build for the ${env.JOB_NAME} failed on DEV.\nBuild console output can be checked using the URL ${env.BUILD_URL}/console  \n\nWarm Regards,\nJenkins "
         }
                        }
         }

       }
     }

    /* stage('Deploy to DHC CaaS INT') {
                                        when {
            expression{params.ENVIRONMENT == "dev/int"}
         }
       steps {
         script {
            if ( params.ENVIRONMENT == "dev/int" ) {
           dir("${WORKSPACE}/helm_install") {
           timeout(time: 60, unit: 'MINUTES')
           {
             withCredentials([file(credentialsId: "", variable: 'KUBE_CFG_FILE')]) {
               def userInput = input(message: 'Do you want to proceed with the deployment to INT?')
               sh 'export KUBECONFIG=${KUBE_CFG_FILE};kubectl get ns;helm upgrade --install --namespace int mb-qa-client --set image.tag=$TAG_NAME ./mb-qa-client -f ./mb-qa-client/values-int.yaml $DRY_RUN'
             }
           }
           }
         }
       }
       }
       post {
         success {
            script {
            if ( params.ENVIRONMENT == "dev/int" ) {
                   mail to: "indranil.biswas@mercedes-benz.com",
                        cc: "soumitra.nath@mercedes-benz.com",
                        bcc: " ",
                        from: "GTD-DOT@daimler.com",
                        replyTo: "",
                        subject: "${env.JOB_NAME}: INT DEPLOYMENT COMPLETED", 
                        body: "Hello All,\n\nThe build for the util${env.JOB_NAME}ities completed successfully on INT.\nBuild console output can be checked using the URL ${env.BUILD_URL}/console  \n\nWarm Regards,\nJenkins "
         }
            }
         }
         failure {
                        script {
            if ( params.ENVIRONMENT == "dev/int" ) {
                   mail to: "indranil.biswas@mercedes-benz.com",
                        cc: "soumitra.nath@mercedes-benz.com",
                        bcc: " ",
                        from: "GTD-DOT@daimler.com",
                        replyTo: "",
                        subject: "${env.JOB_NAME}: INT DEPLOYMENT FAILED", 
                        body: "Hello All,\n\nThe build for the ${env.JOB_NAME} failed on INT.\nBuild console output can be checked using the URL ${env.BUILD_URL}/console  \n\nWarm Regards,\nJenkins "
         }

       }
     }
         }
       }*/
	   
	            stage('harbor image check Prod') {
		                                 when {
            expression{params.ENVIRONMENT == "prod"}
         }
       steps {
        script {
		docker.withRegistry('http://registry.app.corpintra.net', 'HARBOR_LOGIN')
            {
           sh 'docker pull registry.app.corpintra.net/untangle/mb-qa-client:$TAG_NAME'
             def imagecheck = sh( 
                                   script: 'docker images -q registry.app.corpintra.net/untangle/mb-qa-client:\${TAG_NAME}',
                                   returnStdout: true
                                )
              if ( "${imagecheck}" != '' ) {
                        echo "Image registry.app.corpintra.net/untangle/mb-qa-client:$TAG_NAME exists. Proceeding...."
                                            } 
              else {
                         echo "Image registry.app.corpintra.net/untangle/mb-qa-client:$TAG_NAME NOT FOUND. Aborting...."
                         error "This pipeline stops here!"
                   } 
       }
	   }
     }
    }

        /* stage('Prod Approval') {
                                            when {
            expression{params.ENVIRONMENT == "prod"}
         }
                steps {
                    echo "Waiting for Prod approval..."
                    script {
                         if ( params.ENVIRONMENT == "prod" ) {
                        mail to: "indranil.biswas@mercedes-benz.com",
                        cc: "soumitra.nath@mercedes-benz.com",
                        bcc: " ",
                        from: "GTD-DOT@daimler.com",
                        replyTo: "",
                        subject: "${env.JOB_NAME}: PROD DEPLOYMENT APPROVAL", 
                        body: "Hello All,\n\nKindly approve for Production Deployment.\n\nURL to approve Build ${env.BUILD_URL}/input\n\nDeveloper checklist:\n1. Development is complete with Junits with overall coverage above 75%.\n2. Code review is complete.\n3. Sonar violations are fixed.\n4. Functional testing is complete and verified through automated scripts by QA (Test results should be attached in ticket).\n\n\nPO Checklist:\n1. Functionality verified and confirmed by user in INT environment.\n2. Downtime (if any) is already communicated to stakeholders.\n3. Known issues (if any) are already communicated and documented in ticket\n"

                    def deploymentDelay = input id: 'Deploy', message: 'Deploy to production?', parameters: [choice(choices: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'], description: 'Hours to delay deployment?', name: 'deploymentDelay')]
                    sleep time: deploymentDelay.toInteger(), unit: 'HOURS'
                
                    }

                }
            }
         }
              stage('Helm login and add repo to prod') {
                                when {
            expression{params.ENVIRONMENT == "prod"}
         }
       steps {
         withCredentials([usernamePassword(credentialsId: 'HARBOR_LOGIN', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
           sh "helm registry login -u ${USERNAME} -p ${PASSWORD} registry.app.corpintra.net"
           sh 'helm repo update;helm repo list;mkdir helm_install'
           sh 'cd helm_install;helm pull mb-qa-client/mb-qa-client --untar'
         }
       }
     }*/
     stage('Deploy to DHC CaaS PROD') 
	 {
                                        when {
            expression{params.ENVIRONMENT == "prod"}
         }
       steps {
         script {
           
             withCredentials([file(credentialsId: "c51p166.kubeconfig", variable: 'KUBE_CFG_FILE')]) {
               sh "export KUBECONFIG=${KUBE_CFG_FILE};kubectl get ns;helm upgrade --install --namespace untangle-prod mb-qa-client --set image.tag=$TAG_NAME helm -f helm/values-prod.yaml"
               sh "kubectl rollout restart --kubeconfig $KUBE_CFG_FILE deploy mb-qa-client -n untangle-prod"
	     }
		 }
       }
       
       post {
         success {
                                  script {
            if ( params.ENVIRONMENT == "prod" ) {
                   mail to: "indranil.biswas@mercedes-benz.com",
                        cc: "soumitra.nath@mercedes-benz.com",
                        bcc: " ",
                        from: "GTD-DOT@daimler.com",
                        replyTo: "",
                        subject: "${env.JOB_NAME}: PROD DEPLOYMENT COMPLETED", 
                        body: "Hello All,\n\nThe build for the ${env.JOB_NAME} completed successfully on PROD.\nBuild console output can be checked using the URL ${env.BUILD_URL}/console  \n\nWarm Regards,\nJenkins "
         }
                                  }
         }
         failure {
                                            script {
            if ( params.ENVIRONMENT == "prod" ) {
                   mail to: "indranil.biswas@mercedes-benz.com",
                        cc: "soumitra.nath@mercedes-benz.com",
                        bcc: " ",
                        from: "GTD-DOT@daimler.com",
                        replyTo: "",
                        subject: "${env.JOB_NAME}: PROD DEPLOYMENT FAILED", 
                        body: "Hello All,\n\nThe build for the ${env.JOB_NAME} failed on PROD.\nBuild console output can be checked using the URL ${env.BUILD_URL}/console  \n\nWarm Regards,\nJenkins " 
         }
                                            }
         }

       }
     }
  
   }
   post {
     always {
       cleanWs()
     }
     success {
       echo 'I succeeded!'
         script {
         sh 'docker rmi registry.app.corpintra.net/untangle/mb-qa-client:$TAG_NAME'
     }
     }
     unstable {
       echo 'I am unstable :/'
       script {
         sh 'docker rmi registry.app.corpintra.net/untangle/mb-qa-client:$TAG_NAME'
     }
     }
     failure {
       echo 'I failed :('
       script {
         sh 'docker rmi registry.app.corpintra.net/untangle/mb-qa-client:$TAG_NAME'
     }
   }

 }
 }
