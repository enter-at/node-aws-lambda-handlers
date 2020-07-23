import { format } from "../decorator/format";
import { FormatError } from "../error";
import { Format } from "./Format";

export class InputFormat {
    @format("application/json")
    public static json(content: string): unknown {
        try {
            return JSON.parse(content);
        } catch (err) {
            throw new FormatError("Invalid JSON input.");
        }
    }
}

export const json: Format = (InputFormat.json as unknown) as Format;
