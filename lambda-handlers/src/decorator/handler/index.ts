import {HttpLambdaHandler, IHttpLambdaHandlerArguments} from '../..';

export function HttpHandler(args?: IHttpLambdaHandlerArguments) {
    const handler = new HttpLambdaHandler(args);
    return handler.decorator.bind(handler);
}
