import { FluxDispatcher } from "@webpack/common";

export default {
    setSwitch(val: boolean) {
        FluxDispatcher.dispatch({
            type: "CORDWOOD_SETTINGS_UPDATE",
            settings: {
                switch: val,
            },
        });
    },
};
