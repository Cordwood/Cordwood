import { Flux, FluxDispatcher } from "@webpack/common";
import { Storage } from "@utils/localStorage";
import { CordwoodData } from "@/headers/def";
import { components } from "@octokit/openapi-types";
import fetch from "sync-fetch";

export function getCommits() {
    return fetch("https://api.github.com/repos/Cordwood/Cordwood/commits", {
        headers: {
            Accept: "application/vnd.github+json",
        },
    }).json();
}

const CACHE_KEY = "CordwoodDataStore";
const localData: CordwoodData = {
    commitData: [] as unknown as components["schemas"]["commit"][],
    latestFetch: 0,
};

async function handleDataUpdate(newData: CordwoodData) {
    let emitChange = false;

    const cachedData: CordwoodData = {};

    for (const [key, value] of Object.entries(newData)) {
        if (value != null) {
            emitChange = true;
            localData[key] = value;
        }
        cachedData[key] = localData[key];
    }

    if (emitChange) {
        await Storage.set(CACHE_KEY, cachedData);
    }

    return emitChange;
}

class DataStore extends Flux.Store {
    constructor(Dispatcher: typeof FluxDispatcher, cb: (action: { type: string; data: CordwoodData }) => any) {
        super(Dispatcher, cb);
    }

    async initialize() {
        const cachedData = await Storage.get<CordwoodData>(CACHE_KEY);
        if (cachedData != null) {
            await handleDataUpdate(cachedData);
        }
    }

    get commitData() {
        return localData.commitData;
    }

    get latestFetch() {
        return localData.latestFetch;
    }
}

export default new DataStore(FluxDispatcher, async (action) => {
    switch (action.type) {
        case "CORDWOOD_DATA_UPDATE":
            return await handleDataUpdate(action.data);

        default:
            return false;
    }
});
