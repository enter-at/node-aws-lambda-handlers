export interface Format {
    contentType: string;

    apply<T>(content: unknown): T;
}
