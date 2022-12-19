import { faker } from "@faker-js/faker";
import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy";

export function factory(): APIGatewayProxyEvent {
    return {
        body: "",
        headers: { header: faker.random.word() },
        multiValueHeaders: { x: [faker.random.word()] },
        httpMethod: faker.random.word(),
        isBase64Encoded: faker.datatype.boolean(),
        path: faker.random.word(),
        pathParameters: null,
        queryStringParameters: null,
        multiValueQueryStringParameters: null,
        stageVariables: null,
        requestContext: {
            accountId: faker.random.word(),
            apiId: faker.random.word(),
            authorizer: undefined,
            protocol: faker.random.word(),
            httpMethod: faker.random.word(),
            identity: {
                accessKey: faker.random.word(),
                accountId: faker.random.word(),
                apiKey: faker.random.word(),
                apiKeyId: faker.random.word(),
                caller: faker.random.word(),
                cognitoAuthenticationProvider: faker.random.word(),
                cognitoAuthenticationType: faker.random.word(),
                cognitoIdentityId: faker.random.word(),
                cognitoIdentityPoolId: faker.random.word(),
                principalOrgId: faker.random.word(),
                sourceIp: faker.random.word(),
                user: faker.random.word(),
                userAgent: faker.random.word(),
                userArn: faker.random.word(),
                clientCert: null,
            },
            path: faker.random.word(),
            stage: faker.random.word(),
            requestId: faker.random.word(),
            requestTimeEpoch: faker.datatype.number(),
            resourceId: faker.random.word(),
            resourcePath: faker.random.word(),
        },
        resource: faker.random.word(),
    };
}
