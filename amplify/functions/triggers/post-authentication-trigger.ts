import {PostAuthenticationTriggerEvent} from "aws-lambda";

export const handler = async (event: PostAuthenticationTriggerEvent) => {
    console.log("sign event received : ", event);
    return event;
};