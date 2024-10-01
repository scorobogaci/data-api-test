import {defineBackend} from '@aws-amplify/backend';
import {auth} from './auth/resource';
import {data} from './data/resource';
import {storage} from "./storage/resource";
import {postAuthenticationTrigger, postConfirmationSignUpTrigger} from "./functions/resource";
import {PolicyStatement} from "aws-cdk-lib/aws-iam";

const backend = defineBackend({
  auth,
  data,
  storage,
  postConfirmationSignUpTrigger,
  postAuthenticationTrigger
});

const policyStatement = new PolicyStatement();
policyStatement.addResources('*');
policyStatement.addActions('cognito-idp:AdminUpdateUserAttributes');
backend.postConfirmationSignUpTrigger.resources.lambda.addToRolePolicy(policyStatement);
