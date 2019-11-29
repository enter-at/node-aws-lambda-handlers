export abstract class LambdaHandlerError extends Error {
    public constructor(public description?: any) {
        super(description);
    }
}
