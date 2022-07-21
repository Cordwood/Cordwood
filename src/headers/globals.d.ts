import { CordwoodObject } from "./def";

declare global {
    interface Window {
        cordwood?: CordwoodObject;
        _: typeof import("lodash");
        webpackJsonp: Function;
    }
}
