import { LambdaHandlerError } from "./LambdaHandlerError";

export class UnprocessableEntityError extends LambdaHandlerError {
    public readonly name = "UnprocessableEntityError";
}
