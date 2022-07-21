import { CordwoodObject } from "@/headers/def";

declare global {
    interface Window {
        cordwood?: CordwoodObject;
        _: typeof import("lodash");
        webpackJsonp: Function;
    }
}
