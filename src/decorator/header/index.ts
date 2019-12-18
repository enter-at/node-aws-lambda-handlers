import {CORSHeader} from '../../header';

export const cors = (origin?: string, credential?: boolean) => new CORSHeader(origin, credential);
