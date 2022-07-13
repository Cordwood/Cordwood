import logger from "./lib/logger";
import settingsInit from "./ui/settings/settings";
import spitroast from "./lib/patcher";

if (window.cordwood) throw new Error("Cordwood is already injected...");

window.cordwood = {
    util: {
        logger: logger,
    },
    patcher: spitroast,
} as CordwoodObject;

settingsInit();