import { FluxDispatcher } from "@webpack/common";
import { getCommits } from "@lib/flux/stores/DataStore";

export default {
    updateData() {
        FluxDispatcher.dispatch({
            type: "CORDWOOD_DATA_UPDATE",
            data: {
                commitData: getCommits(),
                latestFetch: new Date().getTime() * 1000,
            },
        });
    },
};
