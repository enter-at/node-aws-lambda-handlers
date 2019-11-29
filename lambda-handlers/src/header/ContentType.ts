import {IFormat} from '../format/IFormat';
import {IHeaders} from './IHeaders';

export class ContentType {
    constructor(private format: IFormat) {
    }

    public createHeaders(): IHeaders {
        return {
            'Content-Type': this.format.contentType
        };
    }
}
