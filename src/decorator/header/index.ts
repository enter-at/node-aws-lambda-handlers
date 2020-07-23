import { CORSHeader } from "../../header";

export const cors = (origin?: string, credential?: boolean): CORSHeader => new CORSHeader(origin, credential);
