import {IHeaders} from './IHeaders';

export class CORS {

    constructor(private origin: string = '*', private credentials: boolean = false) {
    }

    public createHeaders(): IHeaders {
        return {
            'Access-Control-Allow-Origin': this.origin,
            ...(this.credentials && {'Access-Control-Allow-Credentials': true})
        };
    }
}
