import {APIGatewayProxyResult} from 'aws-lambda';
import * as httpStatusCode from 'http-status-codes';
import {BadRequestError, ForbiddenError, InternalServerError, LambdaHandlerError, NotFoundError} from './error';

export interface IAPIGatewayResponse extends APIGatewayProxyResult {
    body: any | undefined;
}

export function badRequest(details: string | undefined): IAPIGatewayResponse {
    const error: BadRequestError = new BadRequestError(details);
    return buildResult<BadRequestError>(error, httpStatusCode.BAD_REQUEST);
}

export function forbidden(details: string | undefined): IAPIGatewayResponse {
    const error: ForbiddenError = new ForbiddenError(details);
    return buildResult<ForbiddenError>(error, httpStatusCode.FORBIDDEN);
}

export function unauthorized(details: string | undefined): IAPIGatewayResponse {
    const error: ForbiddenError = new ForbiddenError(details);
    return buildResult<ForbiddenError>(error, httpStatusCode.UNAUTHORIZED);
}

export function internalServerError(): IAPIGatewayResponse {
    const error: InternalServerError = new InternalServerError('InternalServerError');
    return buildResult<InternalServerError>(error, httpStatusCode.INTERNAL_SERVER_ERROR);
}

export function notFound(details: string | undefined): IAPIGatewayResponse {
    const error: NotFoundError = new NotFoundError(details);
    return buildResult<NotFoundError>(error, httpStatusCode.NOT_FOUND);
}

export function ok<T>(result: T): IAPIGatewayResponse {
    return buildResult<T>(result, httpStatusCode.OK);
}

export function created<T>(result: T): IAPIGatewayResponse {
    return buildResult<T>(result, httpStatusCode.CREATED);
}

export function noContent<T>(): IAPIGatewayResponse {
    return buildResult<null>(null, httpStatusCode.NO_CONTENT);
}

function buildResult<T>(result: T, statusCode: number): IAPIGatewayResponse {
    const body = result && result instanceof LambdaHandlerError
        ? {errors: [{name: result.name, details: result.details}]}
        : result;

    return {
        body,
        statusCode
    };
}
