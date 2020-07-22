import { LambdaHandlerError } from "./LambdaHandlerError";

export class FormatError extends LambdaHandlerError {
    public readonly name = "FormatError";
}
