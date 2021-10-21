import { LambdaHandlerError } from "./LambdaHandlerError";

export class ConflictError extends LambdaHandlerError {
    public readonly name = "ConflictError";
}
