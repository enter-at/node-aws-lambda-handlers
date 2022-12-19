import { faker } from "@faker-js/faker";
import { Context } from "aws-lambda/handler";

export function factory(): Context {
    return {
        callbackWaitsForEmptyEventLoop: faker.datatype.boolean(),
        functionName: faker.random.word(),
        functionVersion: faker.random.word(),
        invokedFunctionArn: faker.random.word(),
        memoryLimitInMB: faker.random.word(),
        awsRequestId: faker.random.word(),
        logGroupName: faker.random.word(),
        logStreamName: faker.random.word(),
        getRemainingTimeInMillis: () => faker.datatype.number(),
        done: () => void 0,
        fail: () => void 0,
        succeed: () => void 0,
    };
}
