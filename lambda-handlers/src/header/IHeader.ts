export interface IHeader {
    create(): IHeaders;
}

export interface IHeaders {
    [header: string]: boolean | number | string;
}
