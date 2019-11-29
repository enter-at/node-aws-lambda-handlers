import {APIGatewayProxyResult} from 'aws-lambda';
import {BadRequestError, FormatError, NotFoundError, ValidationError} from '../error';
import {ContentType, CORS, IHeaders} from '../header';
import {badRequest, internalServerError, noContent, notFound, ok} from '../response';
import {ILambdaHandlerArguments, LambdaHandler} from './LambdaHandler';

export interface IHttpLambdaHandlerArguments extends ILambdaHandlerArguments {
    cors?: any;
}

export class HttpLambdaHandler extends LambdaHandler {

    private static handleError(err: any): APIGatewayProxyResult {
        if (err instanceof NotFoundError) {
            return notFound(err.description);
        }
        if (err instanceof BadRequestError || err instanceof FormatError || err instanceof ValidationError) {
            return badRequest(err.description);
        }
        return internalServerError();
    }

    private cors: any;

    constructor(args?: IHttpLambdaHandlerArguments) {
        super(args);
        this.cors = args?.cors ?? new CORS('*', true);
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
        return this.createResponse(HttpLambdaHandler.handleError(exception));
    }

    protected formatInput(event: any): any {
        if ('body' in event) {
            try {
                event.body = super.formatInput(event.body);
            } catch (err) {
                if (err instanceof FormatError) {
                    throw new FormatError([{body: [err.description]}]);
                }
                throw err;
            }
        }
        return event;
    }

    protected formatOutput(result: APIGatewayProxyResult): APIGatewayProxyResult {
        if ('body' in result) {
            result.body = super.formatOutput(result.body);
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
            ...(this.cors && this.cors.createHeaders()),
            ...(this.outputFormat && new ContentType(this.outputFormat).createHeaders())
        };
    }
}
