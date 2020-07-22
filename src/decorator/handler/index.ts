import * as handlers from "../../handler";
import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from "aws-lambda";

type Handler = (event: APIGatewayProxyEvent, context: Context) => Promise<APIGatewayProxyResult>;

export function APIGatewayProxyHandler(args?: handlers.APIGatewayProxyHandlerArguments): Handler {
    const handler = new handlers.APIGatewayProxyHandler(args);
    return (handler.decorator.bind(handler) as unknown) as Handler;
}
