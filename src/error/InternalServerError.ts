import {LambdaHandlerError} from './LambdaHandlerError';

export class InternalServerError extends LambdaHandlerError {
    public readonly name = 'InternalServerError';
}
