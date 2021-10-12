export const BuildSpecContent = {
    version: '0.2',
    phases: {

        pre_build: {
            commands: [
                'echo login to AWS ECR',
                'echo $ACCOUNT_ID.dkr.ecr.$ACCOUNT_REGION.amazonaws.com',
                '(aws ecr get-login-password --region $ACCOUNT_REGION | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$ACCOUNT_REGION.amazonaws.com)',
            ]
        },
        build: {
            commands: [
                'echo Build started on `date`',
                'npm install',
                'echo Building the Docker image...',
                'docker build -t $IMAGE_NAME:latest .',
                'docker tag $IMAGE_NAME:latest $ACCOUNT_ID.dkr.ecr.$ACCOUNT_REGION.amazonaws.com/$IMAGE_NAME:latest',
                'echo Build completed on `date`'
            ]
        },
        post_build: {
            commands: [
                'echo Build completed on `date`',
                'echo Pushing the Docker image...',
                'docker push  $ACCOUNT_ID.dkr.ecr.$ACCOUNT_REGION.amazonaws.com/$IMAGE_NAME:latest',
                'printf \'{"ImageURI":"%s"}\' $ECR_REPO:latest > imageDetail.json',
                'printf \'[{"name":"driver-service","imageUri":"%s"}]\' $ECR_REPO:latest > imagedefinitions.json',
                'echo Pushing Docker Image completed on `date`'
            ]
        }
    },
    artifacts: {
        files: [
            'imageDetail.json',
            'imagedefinitions.json',
            'appspec.yaml',
            'taskdef.json'
        ]
    }
}
