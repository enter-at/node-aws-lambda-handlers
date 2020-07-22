import { LambdaHandlerError } from "./LambdaHandlerError";

export class BadRequestError extends LambdaHandlerError {
    public readonly name = "BadRequestError";
}
