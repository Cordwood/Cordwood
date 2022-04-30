import { CordwoodObject } from "./def";
import logger from "./util/logger";

if (window.cordwood) throw new Error("Cordwood is already injected...");

window.cordwood = {
    util: {
        logger: logger,
    }
} as CordwoodObject;