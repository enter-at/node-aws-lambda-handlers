export abstract class LambdaHandlerError extends Error {
    public constructor(public details?: string | string[]) {
        super(details ? String(details) : undefined);
    }
}
