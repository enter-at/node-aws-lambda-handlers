import { format } from "../decorator/format";
import { Format } from "./Format";

export class OutputFormat {
    @format("application/json")
    public static json(content: unknown): string {
        return JSON.stringify(content);
    }
}

export const json: Format = OutputFormat.json as unknown as Format;
