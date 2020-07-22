export interface Header {
    create(): Headers;
}

export interface Headers {
    [header: string]: boolean | number | string;
}
