export interface IFormat {
    contentType: string;

    apply(content: any): any;
}
