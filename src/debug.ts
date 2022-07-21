import { FluxDispatcher } from "@webpack/common";
import { after } from "@lib/patcher";
import SettingsStore from "@lib/flux/stores/SettingsStore";

export default () => {
    return after("dispatch", FluxDispatcher, (args) => {
        if (SettingsStore.fluxLogger) {
            console.log(args[0]);
        }
    });
};
