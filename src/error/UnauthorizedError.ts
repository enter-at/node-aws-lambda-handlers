import { LambdaHandlerError } from "./LambdaHandlerError";

export class UnauthorizedError extends LambdaHandlerError {
    public readonly name = "UnauthorizedError";
}
