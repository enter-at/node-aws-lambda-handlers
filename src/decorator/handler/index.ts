import * as handlers from "../../handler";

type Handler = (_target: unknown, _propertyName: string, propertyDescriptor: PropertyDescriptor) => PropertyDescriptor;

export function APIGatewayProxyHandler(args?: handlers.APIGatewayProxyHandlerArguments): Handler {
    const handler = new handlers.APIGatewayProxyHandler(args);
    return (handler.decorator.bind(handler) as unknown) as Handler;
}
