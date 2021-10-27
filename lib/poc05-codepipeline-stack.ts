import {Construct, StackProps} from '@aws-cdk/core';
import {Pipeline} from "@aws-cdk/aws-codepipeline";
import {SourceStage} from "./stages/source-stage";
import {BuildStage} from "./stages/build-stage";
import {DeployStage} from "./stages/deploy-stage";
import {ApprovalStage} from "./stages/approval-stage";
import {PipelineConfig} from "../config/pipleline-config";

export class Poc05CodepipelineStack extends Stack {

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const appName = this.node.tryGetContext("appName");

        const codepipeline = new Pipeline(this, appName, {
            crossAccountKeys: false
        })

        //Source Stage
        const sourceStage = new SourceStage(this);
        codepipeline.addStage({
            stageName: "Source",
            actions: [sourceStage.getCodeCommitSourceAction()],
        });

        //Build Stage
        const buildStage = new BuildStage(this);
        codepipeline.addStage({
            stageName: "Build",
            actions: [buildStage.getCodeBuildAction(sourceStage.getSourceOutput())]
        });

        //Staging Stage
        const deployStage = new DeployStage(this);
        codepipeline.addStage({
            stageName: "Deploy-TEST",
            actions: [deployStage.getEcsDeployAction("dev", buildStage.getBuildOutput())]
        });

        //QA Approval Stage
        const approvalStage = new ApprovalStage(this);
        codepipeline.addStage({
            stageName: "Approval",
            actions: [approvalStage.getManualApprovalAction()]
        });

        //Deploy to Prod
        codepipeline.addStage({
            stageName: "Deploy-Prod",
            actions: [deployStage.getCodeDeployEcsDeployAction("prod", buildStage.getBuildOutput())]
        });

    }
}
