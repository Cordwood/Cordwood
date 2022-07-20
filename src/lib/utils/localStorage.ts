import { get, set, del, clear } from "idb-keyval";

class LocalStorage {
    async get<T>(key: string, defaultValue: any | null = null): Promise<T> {
        let value = await get(key);

        if (!value) {
            value = defaultValue;
        }

        return value as unknown as T;
    }

    async set(key: string, value: any) {
        await set(key, value);
    }

    async remove(key: string) {
        await del(key);
    }

    async clear() {
        await clear();
    }
}

export const Storage = new LocalStorage();
