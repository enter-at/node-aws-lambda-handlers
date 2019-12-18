import * as handlers from '../../handler';

export function APIGatewayProxyHandler(args?: handlers.IAPIGatewayProxyHandlerArguments) {
    const handler = new handlers.APIGatewayProxyHandler(args);
    return handler.decorator.bind(handler);
}
