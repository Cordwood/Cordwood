import logger from "@lib/logger";
import settingsInit from "./ui/settings/settings";
import spitroast from "@lib/patcher";
import {findInTree} from "@lib/utils/findInTree";
import {findInReactTree} from "@lib/utils/findInReactTree";
import * as webpack from "@webpack/filters";
import * as common from "@webpack/common";

if (window.cordwood) throw new Error("Cordwood is already injected...");

window.cordwood = {
    util: {
        logger: logger,
        findInTree,
        findInReactTree,
    },
    patcher: { ...spitroast },
    webpack: {
        ...webpack,
        common: { ...common },
    }
} as CordwoodObject;

settingsInit();
