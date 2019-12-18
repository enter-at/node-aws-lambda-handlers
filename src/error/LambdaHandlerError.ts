export abstract class LambdaHandlerError extends Error {
    public constructor(public details?: any) {
        super(details);
    }
}
