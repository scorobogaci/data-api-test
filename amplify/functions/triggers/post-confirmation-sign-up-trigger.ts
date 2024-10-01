import {PostConfirmationConfirmSignUpTriggerEvent} from "aws-lambda";
import {
    AdminUpdateUserAttributesCommand,
    AdminUpdateUserAttributesRequest,
    CognitoIdentityProviderClient
} from "@aws-sdk/client-cognito-identity-provider";

const cognitoIdentityProviderClient = new CognitoIdentityProviderClient({
    region: 'eu-central-1'
});

export const handler = async (event: PostConfirmationConfirmSignUpTriggerEvent) => {
    console.log("post confirmation event received : ", event);
    const input: AdminUpdateUserAttributesRequest = {
        UserPoolId: event.userPoolId,
        Username: event.userName,
        UserAttributes: [
            {
                Name: 'custom:firstLogin',
                Value: 'true'
            }
        ]
    }
    const command = new AdminUpdateUserAttributesCommand(input);
    const response = await cognitoIdentityProviderClient.send(command);
    console.log("Response : ", response);
    return event;
};