import { defineFunction } from "@aws-amplify/backend";

export const postConfirmationSignUpTrigger = defineFunction({
    name: "post-confirmation-trigger",
    entry: "./triggers/post-confirmation-sign-up-trigger.ts",
});

export const postAuthenticationTrigger = defineFunction({
    name: "post-authentication-trigger",
    entry: "./triggers/post-authentication-trigger.ts"
});