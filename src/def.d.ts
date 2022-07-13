import logger from "./lib/logger";

declare global {
    interface Window { 
        cordwood: CordwoodObject;
        // TODO: Proper types 
        webpackJsonp: any;
    }

    interface CordwoodObject {
        util: {
            logger: typeof logger;
        }
        patcher: typeof import("spitroast");
    }
}