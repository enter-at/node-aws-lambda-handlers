import { LambdaHandlerError } from "./LambdaHandlerError";

export class ValidationError extends LambdaHandlerError {
    public readonly name = "ValidationError";
}
