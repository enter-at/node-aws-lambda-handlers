import { Header, Headers } from "./Header";

export class ContentTypeHeader implements Header {
    constructor(private contentType: string) {}

    public create(): Headers {
        return {
            "Content-Type": this.contentType,
        };
    }
}
