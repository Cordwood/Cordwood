import settingsInit from "./ui/settings/settings";

// Util imports
import logger from "@lib/logger";
import { findInTree } from "@utils/findInTree";
import { findInReactTree } from "@utils/findInReactTree";
import { Storage } from "@lib/utils/localStorage";

// Patcher imports
import patcher, { injectCSS, unpatchAll } from "@lib/patcher";

// Webpack imports
import * as webpack from "@webpack/filters";
import * as common from "@webpack/common";
import { Flux } from "@webpack/common";

// Plugin imports
import importPlugin from "@plugins/importPlugin";
import loadPlugin from "@plugins/loadPlugin";

if (window.cordwood) throw new Error("Cordwood is already injected...");

let erroredOnLoad = false;

try {
    settingsInit();
    // Since we are adding custom stores, we need to reinitialize all Flux stores.
    // I don't know if this affects the existing Flux stores, if it does, call the
    // `initialize` function of our own stores manually.
    Flux.initialize();

    const uninjectStyles = injectCSS(
        ".cordwood-settings-header{padding-bottom:1rem}.cordwood-changelog-button{cursor:pointer;display:block!important;color:#faa61a!important;font-size:12px!important;padding:8px 6px 10px 20px!important;opacity:.7;-webkit-transition:opacity .2s!important;transition:opacity .2s}.cordwood-changelog-button:hover{opacity:1;color:#faa61a}"
    );

    window.cordwood = {
        utils: {
            logger: logger,
            findInTree,
            findInReactTree,
            storage: {
                get: Storage.get,
                set: Storage.set,
                remove: Storage.remove,
                clear: Storage.clear,
            }
        },
        patcher: { ...patcher },
        webpack: {
            ...webpack,
            common: { ...common },
        },
        plugins: {
            importPlugin: importPlugin,
            loadPlugin: loadPlugin,
            loaded: new Array<CordwoodPlugin>(),
        },
        uninject: () => {
            unpatchAll();
            uninjectStyles();
            delete window.cordwood;
        },
    } as CordwoodObject;

    process.env.DEV === "true"
        ? (window.cordwood!.changelog = process.env.__CHANGELOG__)
        : fetch("https://raw.githubusercontent.com/Cordwood/Cordwood/master/CHANGELOG.md", { cache: "no-store" }).then((data) => data.text().then((text) => Object.assign(window.cordwood!, { changelog: text })));
} catch (e: Error | any) {
    erroredOnLoad = true;
    logger.error(`Cordwood failed to initialize... ${e.stack ? e.stack : e.toString()}`);
}

if (!erroredOnLoad) {
    logger.log("Loaded successfully!");
}
