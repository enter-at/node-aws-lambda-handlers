export abstract class LambdaHandlerError extends Error {
    public constructor(public details?: string) {
        super(details);
    }
}
