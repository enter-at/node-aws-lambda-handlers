export type JSONType = { [key: string]: unknown };
export type LoggerArgument = (JSONType | string | unknown)[];

export interface Logger {
    info(...args: LoggerArgument): void;
    warn(...args: LoggerArgument): void;
    error(...args: LoggerArgument): void;
    debug(...args: LoggerArgument): void;
}
