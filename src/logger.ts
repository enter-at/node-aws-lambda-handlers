import winston from "winston";

type JSONType = { [key: string]: unknown };
type LoggerArgument = (JSONType | string | unknown)[];

interface Logger {
    info(...args: LoggerArgument): void;
    warn(...args: LoggerArgument): void;
    error(...args: LoggerArgument): void;
    debug(...args: LoggerArgument): void;
}

const noopLogger = () =>
    ["info", "warn", "error", "debug"].reduce((logger: Record<string, unknown>, fn: string) => {
        logger[fn] = () => null;
        return logger;
    }, {});

const winstonLogger = () => {
    const { timestamp, combine, json, errors } = winston.format;

    const logger = winston.createLogger({
        format: combine(timestamp(), errors(), json()),
        level: "error",
        transports: [new winston.transports.Console()],
    });

    logger.on("error", (error: Error) => {
        // eslint-disable-next-line no-console
        console.error(error);
    });

    return logger;
};

export default (process.env.NODE_ENV === "testing" ? noopLogger() : winstonLogger()) as Logger;
