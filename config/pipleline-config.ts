import {IPipelineConfigProps} from "../lib/PipelineConfigProps";
import {BuildSpecContent} from "./buildspec-content";

export const PipelineConfig: IPipelineConfigProps = {
    serviceName: 'poc05',
    sourceStage: {
        repositoryName: 'poc05'
    },
    buildStage: {
        ecrRepositoryName: 'poc05',
        buildSpec: BuildSpecContent
    },
    deployStage: {
        dev: {
            clusterName: 'poc-infrastructure-cluster',
            vpcId: 'vpc-0d7bd4170a4ab4a5f',
            securityGroup: 'sg-09be28a47e7bd86cf'
        },
        prod: {
            clusterName: 'poc-infrastructure-cluster',
            vpcId: 'vpc-0d7bd4170a4ab4a5f',
            securityGroup: 'sg-09be28a47e7bd86cf'


        },
    },
    approvalStage: {
        notifyEmails: ['samuelr@ganz.com'],
        notifyTopic: 'arn:aws:sns:us-east-1:604009108246:Samuelr_Notify_Email'
    },
}