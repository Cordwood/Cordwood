import { FluxDispatcher } from "@webpack/common";

// TODO: Generalize, e.g. `setSettings('key', 'value');
//  would need an update to the handler
export default {
    setFlux(val: boolean) {
        FluxDispatcher.dispatch({
            type: "CORDWOOD_SETTINGS_UPDATE",
            settings: {
                fluxLogger: val,
            },
        });
    },
};
