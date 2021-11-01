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
    UnprocessableEntityError,
} from "./error";
import { ConflictError } from "./error/ConflictError";

type Details = string | string[] | undefined;
export interface APIGatewayResponse extends Omit<APIGatewayProxyResult, "body"> {
    body: unknown | undefined;
}

export function badRequest(details: Details): APIGatewayResponse {
    const error: BadRequestError = new BadRequestError(details);
    return buildResult<BadRequestError>(error, constants.HTTP_STATUS_BAD_REQUEST);
}

export function forbidden(details: Details): APIGatewayResponse {
    const error: ForbiddenError = new ForbiddenError(details);
    return buildResult<ForbiddenError>(error, constants.HTTP_STATUS_FORBIDDEN);
}

export function unauthorized(details: Details): APIGatewayResponse {
    const error: UnauthorizedError = new UnauthorizedError(details);
    return buildResult<UnauthorizedError>(error, constants.HTTP_STATUS_UNAUTHORIZED);
}

export function internalServerError(): APIGatewayResponse {
    const error: InternalServerError = new InternalServerError("InternalServerError");
    return buildResult<InternalServerError>(error, constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
}

export function notFound(details: Details): APIGatewayResponse {
    const error: NotFoundError = new NotFoundError(details);
    return buildResult<NotFoundError>(error, constants.HTTP_STATUS_NOT_FOUND);
}

export function requestTimeout(details: Details): APIGatewayResponse {
    const error: RequestTimeoutError = new RequestTimeoutError(details);
    return buildResult<RequestTimeoutError>(error, constants.HTTP_STATUS_REQUEST_TIMEOUT);
}

export function unprocessableEntity(details: Details): APIGatewayResponse {
    const error: UnprocessableEntityError = new UnprocessableEntityError(details);
    return buildResult<UnprocessableEntityError>(error, constants.HTTP_STATUS_UNPROCESSABLE_ENTITY);
}

export function conflict(details: Details): APIGatewayResponse {
    const error: ConflictError = new ConflictError(details);
    return buildResult<ConflictError>(error, constants.HTTP_STATUS_CONFLICT);
}

export function ok<T>(result: T): APIGatewayResponse {
    return buildResult<T>(result, constants.HTTP_STATUS_OK);
}

export function created<T>(result: T): APIGatewayResponse {
    return buildResult<T>(result, constants.HTTP_STATUS_CREATED);
}

export function noContent(): APIGatewayResponse {
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
