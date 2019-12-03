import {IHeader, IHeaders} from './IHeader';

export class ContentTypeHeader implements IHeader {
    constructor(private contentType: string) {
    }

    public create(): IHeaders {
        return {
            'Content-Type': this.contentType
        };
    }
}
