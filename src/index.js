/// <reference path="types.d.ts" />

import init from "./lib/init";

if (window.cordwood) {
    throw new Error("Cordwood is already injected!");
}

try {
    init();
} catch (e) {
    throw new Error("An unknown error occurred....", e);
}
