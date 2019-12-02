import {
    ALBEvent,
    ALBHandler,
    APIGatewayProxyEvent,
    APIGatewayProxyHandler,
    CloudFormationCustomResourceEvent,
    CloudFormationCustomResourceHandler,
    CloudFrontRequestHandler,
    CloudFrontResponseHandler,
    CloudWatchLogsEvent,
    CloudWatchLogsHandler,
    CloudWatchLogsLogEvent,
    CodePipelineCloudWatchActionHandler,
    CodePipelineCloudWatchHandler,
    CodePipelineCloudWatchPipelineHandler,
    CodePipelineCloudWatchStageHandler,
    CognitoUserPoolEvent,
    CognitoUserPoolTriggerHandler,
    Context,
    CustomAuthorizerEvent,
    CustomAuthorizerHandler,
    DynamoDBStreamEvent,
    DynamoDBStreamHandler,
    FirehoseTransformationHandler,
    KinesisStreamHandler,
    LexHandler,
    S3BatchEvent,
    S3BatchHandler,
    S3Event,
    S3Handler,
    ScheduledEvent,
    ScheduledHandler,
    SNSEvent,
    SNSHandler,
    SQSHandler
} from 'aws-lambda';
import {IFormat} from '../format/IFormat';
import * as inputFormat from '../format/InputFormat';
import * as outputFormat from '../format/OutputFormat';

export interface IBaseHandlerArguments {
    inputFormat?: IFormat;
    outputFormat?: IFormat;
}

type Event =
    | ALBEvent
    | APIGatewayProxyEvent
    | CloudFormationCustomResourceEvent
    | CloudWatchLogsEvent
    | CloudWatchLogsLogEvent
    | CognitoUserPoolEvent
    | CustomAuthorizerEvent
    | DynamoDBStreamEvent
    | S3BatchEvent
    | S3Event
    | SNSEvent
    | ScheduledEvent;

type Handler =
    | ALBHandler
    | APIGatewayProxyHandler
    | CloudFormationCustomResourceHandler
    | CloudFrontRequestHandler
    | CloudFrontResponseHandler
    | CloudWatchLogsHandler
    | CodePipelineCloudWatchActionHandler
    | CodePipelineCloudWatchHandler
    | CodePipelineCloudWatchPipelineHandler
    | CodePipelineCloudWatchStageHandler
    | CognitoUserPoolTriggerHandler
    | CustomAuthorizerHandler
    | DynamoDBStreamHandler
    | FirehoseTransformationHandler
    | KinesisStreamHandler
    | LexHandler
    | S3BatchHandler
    | S3Handler
    | SNSHandler
    | SQSHandler
    | ScheduledHandler;

export abstract class BaseHandler {

    protected inputFormat: IFormat;
    protected outputFormat: IFormat;

    constructor(args?: IBaseHandlerArguments) {
        this.inputFormat = args?.inputFormat ?? inputFormat.json;
        this.outputFormat = args?.outputFormat ?? outputFormat.json;
    }

    public decorator(target: object, propertyName: string, propertyDescriptor: PropertyDescriptor): PropertyDescriptor {
        propertyDescriptor.value = this.wrapper(propertyDescriptor.value);
        return propertyDescriptor;
    }

    public wrapper(method: any): Handler {
        // tslint:disable-next-line:no-this-assignment
        const handler = this;
        return async function fn(event: Event, context: Context): Promise<any> {
            try {
                // @ts-ignore
                return handler.after(await method.apply(this, handler.before(event, context)));
            } catch (err) {
                return handler.onException(err);
            }
        };
    }

    protected before(event: Event, context: Context): [any, Context] {
        return [this.formatInput(event), context];
    }

    protected after(result: any): any {
        return this.formatOutput(result);
    }

    protected onException(exception: Error): any {
        throw exception;
    }

    protected formatOutput(result: any): any {
        return this.outputFormat.apply(result);
    }

    protected formatInput(event: any): any {
        return this.inputFormat.apply(event);
    }
}
