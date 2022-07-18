export default async function importPlugin(url: string) {
    // Define options
    const noCache = { cache: "no-cache" } as RequestInit;

    // Ensure the url has a slash at the end
    const pluginBaseUrl = new URL(url.endsWith("/") ? url : url + "/");

    // Get the plugin's manifest
    const manifestReq = await fetch(pluginBaseUrl + "manifest.json", noCache);

    // Ensure the manifest was found
    if (!manifestReq.ok) {
        throw new Error(`Could not load manifest for plugin at ${url}`);
    }

    // Parse the manifest as JSON
    let pluginManifest: PluginManifest;

    try {
        pluginManifest = await manifestReq.json();
    } catch (e) {
        throw new Error(`Could not parse manifest for plugin at ${url}`);
    };

    // Get the plugin's main file (index.js)
    let pluginMain: string;

    try {
        pluginMain = await (await fetch(pluginBaseUrl + "index.js", noCache)).text();
    } catch (e) {
        throw new Error(`Could not load main file for plugin at ${url}`);
    }

    // Return these in a usable format
    return {
        manifest: pluginManifest,
        url: pluginBaseUrl,
        main: pluginMain,
    } as CordwoodPlugin;
}