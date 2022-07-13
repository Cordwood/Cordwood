import logger from "@lib/logger";
import settingsInit from "./ui/settings/settings";
import spitroast from "@lib/patcher";
import * as webpack from "@webpack/filters";
import * as common from "@webpack/common";

if (window.cordwood) throw new Error("Cordwood is already injected...");

window.cordwood = {
    util: {
        logger: logger,
    },
    patcher: { ...spitroast },
    webpack: {
        ...webpack,
        common: { ...common },
    }
} as CordwoodObject;

settingsInit();