import {format} from '../decorator/format';
import {FormatError} from '../error';
import {IFormat} from './IFormat';

export class InputFormat {
    @format('application/json')
    public static json(content: any): any {
        try {
            return JSON.parse(content);
        } catch (err) {
            throw new FormatError('Invalid JSON input.');
        }
    }
}

export const json: IFormat = InputFormat.json as unknown as IFormat;
