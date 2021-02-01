import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
    BadRequestError,
    ForbiddenError,
    FormatError,
    NotFoundError,
    RequestTimeoutError,
    ValidationError,
    UnauthorizedError,
} from "../error";
import { UnprocessableEntityError } from "../error/UnprocessableEntityError";
import { ContentTypeHeader, CORSHeader, Header, Headers } from "../header";
import logger from "../logger";
import {
    badRequest,
    forbidden,
    APIGatewayResponse,
    internalServerError,
    noContent,
    notFound,
    ok,
    requestTimeout,
    unauthorized,
    unprocessableEntity,
} from "../response";
import { BaseHandler, BaseHandlerArguments } from "./BaseHandler";

export interface APIGatewayProxyHandlerArguments extends BaseHandlerArguments {
    cors?: CORSHeader;
}

export class APIGatewayProxyHandler extends BaseHandler {
    private static handleError(err: Error): APIGatewayResponse {
        if (err instanceof ForbiddenError) {
            return forbidden(err.details);
        }
        if (err instanceof UnauthorizedError) {
            return unauthorized(err.details);
        }
        if (err instanceof BadRequestError || err instanceof FormatError || err instanceof ValidationError) {
            return badRequest(err.details);
        }
        if (err instanceof RequestTimeoutError) {
            return requestTimeout(err.details);
        }
        if (err instanceof UnprocessableEntityError) {
            return unprocessableEntity(err.details);
        }
        if (err instanceof NotFoundError) {
            return notFound(err.details);
        }
        logger.error({
            name: err.name,
            message: err.message,
            stack: err.stack,
        });
        return internalServerError();
    }

    private corsHeader: Header;

    constructor(args?: APIGatewayProxyHandlerArguments) {
        super(args);
        this.corsHeader = args?.cors ?? new CORSHeader("*", true);
    }

    protected after(result: APIGatewayResponse): APIGatewayProxyResult {
        result = result ?? noContent();
        if (result.statusCode === undefined) {
            result = ok(result);
        }
        return this.createResponse(result);
    }

    protected onException(exception: Error): APIGatewayProxyResult {
        return this.createResponse(APIGatewayProxyHandler.handleError(exception));
    }

    protected formatInput(event: APIGatewayProxyEvent): APIGatewayProxyEvent {
        if (!event.body) {
            return event;
        }
        try {
            event.body = this.inputFormat.apply(event.body);
            return event;
        } catch (err) {
            throw err;
        }
    }

    protected formatOutput(result: APIGatewayResponse): APIGatewayProxyResult {
        const { body, ...properties } = result;
        return {
            ...(body && { body: this.outputFormat.apply(body) }),
            ...properties,
        };
    }

    private createResponse(result: APIGatewayResponse): APIGatewayProxyResult {
        result.headers = this.createHeaders(result.headers);
        return this.formatOutput(result);
    }

    private createHeaders(headers: Headers | undefined): Headers {
        return {
            ...headers,
            ...(this.corsHeader && this.corsHeader.create()),
            ...(this.outputFormat && new ContentTypeHeader(this.outputFormat.contentType).create()),
        };
    }
}
