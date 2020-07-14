import faker from "faker";
import { Context } from "aws-lambda/handler";

export function factory(): Context {
    return {
        callbackWaitsForEmptyEventLoop: faker.random.boolean(),
        functionName: faker.random.word(),
        functionVersion: faker.random.word(),
        invokedFunctionArn: faker.random.word(),
        memoryLimitInMB: faker.random.word(),
        awsRequestId: faker.random.word(),
        logGroupName: faker.random.word(),
        logStreamName: faker.random.word(),
        getRemainingTimeInMillis: () => faker.random.number(),
        done: () => {},
        fail: () => {},
        succeed: () => {},
    };
}
