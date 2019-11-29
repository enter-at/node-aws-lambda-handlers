import {LambdaHandlerError} from './LambdaHandlerError';

export class ForbiddenError extends LambdaHandlerError {
    public readonly name = 'ForbiddenError';
}
