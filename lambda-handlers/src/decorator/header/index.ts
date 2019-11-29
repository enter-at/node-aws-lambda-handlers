import {CORS} from '../../header';

export const cors = (origin?: string, credential?: boolean) => new CORS(origin, credential);
