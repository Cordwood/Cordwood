function getLocalStoragePropertyDescriptor() {
    const frame = document.createElement("frame");
    frame.src = "about:blank";

    document.body.appendChild(frame);

    let r = Object.getOwnPropertyDescriptor(frame.contentWindow, "localStorage");

    frame.remove();

    return r;
}

export function recoverLocalStorage() {
    Object.defineProperty(window, "localStorage", {
        ...getLocalStoragePropertyDescriptor(),
    });
    return () => {
        // @ts-expect-error Fuck you.
        delete window.localStorage;
    };
}

class LocalStorage {
    get<T>(key: string, defaultValue: string | null = null): T {
        let value = localStorage.getItem(key);

        if (value != null) {
            try {
                value = JSON.parse(value);
            } catch (e) {
                value = defaultValue;
            }
        } else {
            value = defaultValue;
        }

        return value as unknown as T;
    }

    set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }

    clear() {
        localStorage.clear();
    }
}

export const Storage = new LocalStorage();
