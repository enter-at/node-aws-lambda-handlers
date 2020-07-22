import { LambdaHandlerError } from "./LambdaHandlerError";

export class RequestTimeoutError extends LambdaHandlerError {
    public readonly name = "RequestTimeoutError";
}
