import {IHeader, IHeaders} from './IHeader';

export class CORSHeader implements IHeader {

    constructor(private origin: string = '*', private credentials: boolean = false) {
    }

    public create(): IHeaders {
        return {
            'Access-Control-Allow-Origin': this.origin,
            ...(this.credentials && {'Access-Control-Allow-Credentials': true})
        };
    }
}
