import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import {BadRequestError, FormatError, NotFoundError, ValidationError} from '../error';
import {ContentTypeHeader, CORSHeader, IHeader, IHeaders} from '../header';
import {badRequest, internalServerError, noContent, notFound, ok} from '../response';
import {BaseHandler, IBaseHandlerArguments} from './BaseHandler';

export interface IAPIGatewayProxyHandlerArguments extends IBaseHandlerArguments {
    cors?: CORSHeader;
}

export class APIGatewayProxyHandler extends BaseHandler {

    private static handleError(err: Error): APIGatewayProxyResult {
        if (err instanceof NotFoundError) {
            return notFound(err.description);
        }
        if (err instanceof BadRequestError || err instanceof FormatError || err instanceof ValidationError) {
            return badRequest(err.description);
        }
        return internalServerError();
    }

    private corsHeader: IHeader;

    constructor(args?: IAPIGatewayProxyHandlerArguments) {
        super(args);
        this.corsHeader = args?.cors ?? new CORSHeader('*', true);
    }

    protected after(result: any): APIGatewayProxyResult {
        if (result === undefined || result === null) {
            result = noContent();
        }
        if (result.statusCode === undefined) {
            result = ok(result);
        }
        return this.createResponse(result);
    }

    protected onException(exception: any): APIGatewayProxyResult {
        return this.createResponse(APIGatewayProxyHandler.handleError(exception));
    }

    protected formatInput(event: APIGatewayProxyEvent): APIGatewayProxyEvent {
        if (!event?.body) {
            return event;
        }
        try {
            event.body = super.formatInput(event.body);
            return event;
        } catch (err) {
            if (err instanceof FormatError) {
                throw new FormatError([{body: [err.description]}]);
            }
            throw err;
        }
    }

    protected formatOutput(result: APIGatewayProxyResult): APIGatewayProxyResult {
        if (result?.body) {
            result.body = super.formatOutput(result.body);
        } else {
            delete result.body;
        }
        return result;
    }

    private createResponse(result: APIGatewayProxyResult): APIGatewayProxyResult {
        result.headers = this.createHeaders(result.headers);
        return this.formatOutput(result);
    }

    private createHeaders(headers: IHeaders | undefined): IHeaders {
        return {
            ...headers,
            ...(this.corsHeader && this.corsHeader.create()),
            ...(this.outputFormat && new ContentTypeHeader(this.outputFormat.contentType).create())
        };
    }
}
