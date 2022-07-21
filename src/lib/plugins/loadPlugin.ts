import { CordwoodPlugin } from "@/headers/def";

const watchTheWaterUnfold = window.eval;

export default async function loadPlugin(plugin: CordwoodPlugin) {
    // Add the plugin to the list of loaded plugins
    window.cordwood!.plugins.loaded.push(plugin);

    // Get the plugin's exports
    const pluginExports = watchTheWaterUnfold(plugin.main)(window.cordwood);

    // Run the plugin's main function, if it exists
    if (pluginExports.onLoad) pluginExports.onLoad();
};
