"use client";

import { Amplify, type ResourcesConfig } from 'aws-amplify';

export const authConfig: ResourcesConfig["Auth"] = {
    Cognito: {
        userPoolId: String(process.env.AWS_COGNITO_POOL_ID),
        userPoolClientId: String(process.env.AWS_COGNITO_APP_CLIENT_ID),
    },
}

Amplify.configure(
    {
        Auth: authConfig,
    },
    {ssr: true},
);

export default function ConfigureAmplifyClientSide() {
    return null;
}

