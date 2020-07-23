import { APIGatewayProxyResult } from "aws-lambda";
import { constants } from "http2";
import {
    BadRequestError,
    ForbiddenError,
    InternalServerError,
    LambdaHandlerError,
    NotFoundError,
    RequestTimeoutError,
    UnauthorizedError,
} from "./error";

export interface APIGatewayResponse extends Omit<APIGatewayProxyResult, "body"> {
    body: unknown | undefined;
}

export function badRequest(details: string | undefined): APIGatewayResponse {
    const error: BadRequestError = new BadRequestError(details);
    return buildResult<BadRequestError>(error, constants.HTTP_STATUS_BAD_REQUEST);
}

export function forbidden(details: string | undefined): APIGatewayResponse {
    const error: ForbiddenError = new ForbiddenError(details);
    return buildResult<ForbiddenError>(error, constants.HTTP_STATUS_FORBIDDEN);
}

export function unauthorized(details: string | undefined): APIGatewayResponse {
    const error: UnauthorizedError = new UnauthorizedError(details);
    return buildResult<UnauthorizedError>(error, constants.HTTP_STATUS_UNAUTHORIZED);
}

export function internalServerError(): APIGatewayResponse {
    const error: InternalServerError = new InternalServerError("InternalServerError");
    return buildResult<InternalServerError>(error, constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
}

export function notFound(details: string | undefined): APIGatewayResponse {
    const error: NotFoundError = new NotFoundError(details);
    return buildResult<NotFoundError>(error, constants.HTTP_STATUS_NOT_FOUND);
}

export function requestTimeout(details: string | undefined): APIGatewayResponse {
    const error: RequestTimeoutError = new RequestTimeoutError(details);
    return buildResult<RequestTimeoutError>(error, constants.HTTP_STATUS_REQUEST_TIMEOUT);
}

export function ok<T>(result: T): APIGatewayResponse {
    return buildResult<T>(result, constants.HTTP_STATUS_OK);
}

export function created<T>(result: T): APIGatewayResponse {
    return buildResult<T>(result, constants.HTTP_STATUS_CREATED);
}

export function noContent<T>(): APIGatewayResponse {
    return buildResult<null>(null, constants.HTTP_STATUS_NO_CONTENT);
}

function buildResult<T>(result: T, statusCode: number): APIGatewayResponse {
    const body =
        result && result instanceof LambdaHandlerError
            ? { errors: [{ name: result.name, details: result.details }] }
            : result;

    return {
        body,
        statusCode,
    };
}
