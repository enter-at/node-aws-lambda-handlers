import {HttpLambdaHandler, IHttpLambdaHandlerArguments} from '../../handler';

export function HttpHandler(args?: IHttpLambdaHandlerArguments) {
    const handler = new HttpLambdaHandler(args);
    return handler.decorator.bind(handler);
}
