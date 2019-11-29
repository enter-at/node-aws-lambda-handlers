import {format} from '../decorator/format';
import {IFormat} from './IFormat';

export class OutputFormat {
    @format('application/json')
    public static json(content: any): any {
        return JSON.stringify(content);
    }
}

export const json: IFormat = OutputFormat.json as unknown as IFormat;
