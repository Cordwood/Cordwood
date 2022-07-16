import logger from "@lib/logger";
import settingsInit from "./ui/settings/settings";
import patcher, { injectCSS, unpatchAll } from "@lib/patcher";
import { findInTree } from "@utils/findInTree";
import { findInReactTree } from "@utils/findInReactTree";
import * as webpack from "@webpack/filters";
import * as common from "@webpack/common";

if (window.cordwood) throw new Error("Cordwood is already injected...");

let erroredOnLoad = false;

try {
    settingsInit();
    const uninjectStyles = injectCSS(
        ".cordwood-settings-header{padding-bottom:1rem}.cordwood-changelog-button{cursor:pointer;display:block!important;color:#faa61a!important;font-size:12px!important;padding:8px 6px 10px 20px!important;opacity:.7;-webkit-transition:opacity .2s!important;transition:opacity .2s}.cordwood-changelog-button:hover{opacity:1;color:#faa61a}"
    );

    window.cordwood = {
        util: {
            logger: logger,
            findInTree,
            findInReactTree,
        },
        patcher: { ...patcher },
        webpack: {
            ...webpack,
            common: { ...common },
        },
        uninject: () => {
            unpatchAll();
            uninjectStyles();
            delete window.cordwood;
        },
    } as CordwoodObject;

    fetch("https://raw.githubusercontent.com/Cordwood/Cordwood/master/CHANGELOG.md", { cache: "no-store" }).then((data) => data.text().then((text) => Object.assign(window.cordwood!, { changelog: text })));
} catch (e: Error | any) {
    erroredOnLoad = true;
    logger.error(`Cordwood failed to initialize... ${e.stack ? e.stack : e.toString()}`);
}

if (!erroredOnLoad) {
    logger.log("Loaded successfully!");
}
