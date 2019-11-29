import {LambdaHandlerError} from './LambdaHandlerError';

export class NotFoundError extends LambdaHandlerError {
    public readonly name = 'NotFoundError';
}
