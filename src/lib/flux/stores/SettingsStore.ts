import { Flux, FluxDispatcher } from "@webpack/common";
import { Storage } from "@utils/localStorage";
import { CordwoodSettings } from "@/headers/def";

const CACHE_KEY = "CordwoodSettingsStore";

const localSettings: CordwoodSettings = {
    fluxLogger: false,
};

async function handleSettingsUpdate(newSettings: CordwoodSettings) {
    let emitChange = false;

    const cachedSettings: CordwoodSettings = {};

    for (const [key, value] of Object.entries(newSettings)) {
        if (value != null) {
            emitChange = true;
            localSettings[key] = value;
        }
        cachedSettings[key] = localSettings[key];
    }

    if (emitChange) {
        await Storage.set(CACHE_KEY, cachedSettings);
    }

    return emitChange;
}

class SettingsStore extends Flux.Store {
    constructor(Dispatcher: typeof FluxDispatcher, cb: (action: { type: string; settings: CordwoodSettings }) => any) {
        super(Dispatcher, cb);
    }

    async initialize() {
        const cachedSettings = await Storage.get<CordwoodSettings>(CACHE_KEY);
        if (cachedSettings != null) {
            await handleSettingsUpdate(cachedSettings);
        }
    }

    get fluxLogger() {
        return localSettings.fluxLogger;
    }
}

export default new SettingsStore(FluxDispatcher, async (action) => {
    switch (action.type) {
        case "CORDWOOD_SETTINGS_UPDATE":
            return await handleSettingsUpdate(action.settings);

        default:
            return false;
    }
});
