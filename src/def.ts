import logger from "./util/logger";

export interface CordwoodObject {
    util: {
        logger: typeof logger;
    }
}

declare global {
    interface Window { cordwood: CordwoodObject; }
}