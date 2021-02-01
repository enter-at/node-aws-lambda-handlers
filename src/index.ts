import { Config } from "./Config";

export * from "./decorator/format";
export * from "./decorator/handler";
export * from "./decorator/header";
export * from "./error";

import * as input from "./format/InputFormat";
import * as output from "./format/OutputFormat";

export const config = new Config();

export const format = {
    input,
    output,
};

export * from "./header";
export * from "./response";
