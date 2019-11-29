import {Context} from 'aws-lambda';
import {IFormat} from '../format/IFormat';
import * as inputFormat from '../format/InputFormat';
import * as outputFormat from '../format/OutputFormat';

export interface ILambdaHandlerArguments {
    inputFormat?: IFormat;
    outputFormat?: IFormat;
}

export abstract class LambdaHandler {

    protected inputFormat: IFormat;
    protected outputFormat: IFormat;

    constructor(args?: ILambdaHandlerArguments) {
        this.inputFormat = args?.inputFormat ?? inputFormat.json;
        this.outputFormat = args?.outputFormat ?? outputFormat.json;
    }

    public decorator(target: object, propertyName: string, propertyDescriptor: PropertyDescriptor): PropertyDescriptor {
        propertyDescriptor.value = this.wrapper(propertyDescriptor.value);
        return propertyDescriptor;
    }

    public wrapper(method: any): any {
        // tslint:disable-next-line:no-this-assignment
        const handler = this;
        return async function fn(event: any, context: Context): Promise<any> {
            try {
                // @ts-ignore
                return handler.after(await method.apply(this, handler.before(event, context)));
            } catch (err) {
                return handler.onException(err);
            }
        };
    }

    protected before(event: any, context: Context): [any, Context] {
        return [this.formatInput(event), context];
    }

    protected after(result: any): any {
        return this.formatOutput(result);
    }

    protected onException(exception: any): any {
        throw exception;
    }

    protected formatOutput(result: any): any {
        return this.outputFormat.apply(result);
    }

    protected formatInput(event: any): any {
        return this.inputFormat.apply(event);
    }
}
