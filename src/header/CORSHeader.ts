import { Header, Headers } from "./Header";

export class CORSHeader implements Header {
    constructor(private origin: string = "*", private credentials: boolean = false) {}

    public create(): Headers {
        return {
            "Access-Control-Allow-Origin": this.origin,
            ...(this.credentials && { "Access-Control-Allow-Credentials": true }),
        };
    }
}
