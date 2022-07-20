import { Flux, FluxDispatcher } from "@webpack/common";
import { Storage } from "@utils/localStorage";

const CACHE_KEY = "CordwoodSettingsStore";

const localSettings: CordwoodSettings = {
    switch: false,
};

function handleSettingsUpdate(newSettings: CordwoodSettings) {
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
        Storage.set(CACHE_KEY, cachedSettings);
    }

    return emitChange;
}

class SettingsStore extends Flux.Store {
    constructor(Dispatcher: typeof FluxDispatcher, cb: (action: { type: string; settings: CordwoodSettings }) => any) {
        super(Dispatcher, cb);
    }

    initialize() {
        const cachedSettings = Storage.get<CordwoodSettings>(CACHE_KEY);
        if (cachedSettings != null) {
            handleSettingsUpdate(cachedSettings);
        }
    }

    getSwitch() {
        return localSettings.switch;
    }
}

export default new SettingsStore(FluxDispatcher, (action) => {
    switch (action.type) {
        case "CORDWOOD_SETTINGS_UPDATE":
            return handleSettingsUpdate(action.settings);

        default:
            return false;
    }
});
