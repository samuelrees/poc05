#!/usr/bin/env node
import 'source-map-support/register';
import {App} from '@aws-cdk/core';
import { Poc05CodepipelineStack } from '../lib/poc05-codepipeline-stack';

const app = new App();
new Poc05CodepipelineStack(app, 'Poc05CodepipelineStack', {

  env: { account: '604009108246', region: 'us-east-1' },

});
