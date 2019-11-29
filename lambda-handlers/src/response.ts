import {APIGatewayProxyResult} from 'aws-lambda';
import * as httpStatusCode from 'http-status-codes';
import {BadRequestError, ForbiddenError, InternalServerError, LambdaHandlerError, NotFoundError} from './error';

export function badRequest(description: string | undefined): APIGatewayProxyResult {
    const error: BadRequestError = new BadRequestError(description);
    return buildResult<BadRequestError>(error, httpStatusCode.BAD_REQUEST);
}

export function forbidden(description: string | undefined): APIGatewayProxyResult {
    const error: ForbiddenError = new ForbiddenError(description);
    return buildResult<ForbiddenError>(error, httpStatusCode.FORBIDDEN);
}

export function internalServerError(): APIGatewayProxyResult {
    const error: InternalServerError = new InternalServerError('InternalServerError');
    return buildResult<InternalServerError>(error, httpStatusCode.INTERNAL_SERVER_ERROR);
}

export function notFound(description: string | undefined): APIGatewayProxyResult {
    const error: NotFoundError = new NotFoundError(description);
    return buildResult<NotFoundError>(error, httpStatusCode.NOT_FOUND);
}

export function ok<T>(result: T): APIGatewayProxyResult {
    return buildResult<T>(result, httpStatusCode.OK);
}

export function created<T>(result: T): APIGatewayProxyResult {
    return buildResult<T>(result, httpStatusCode.CREATED);
}

export function noContent<T>(): APIGatewayProxyResult {
    return buildResult<null>(null, httpStatusCode.NO_CONTENT);
}

function buildResult<T>(result: T, statusCode: number): APIGatewayProxyResult {
    const body = result && JSON.stringify(result instanceof LambdaHandlerError
        ? {errors: result}
        : result
    );

    return {
        body,
        statusCode
    };
}
