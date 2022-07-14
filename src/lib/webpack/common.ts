import { findByProps } from "@webpack/filters";

// React
export const React = findByProps("createElement") as typeof import("react");
export const ReactDOM = findByProps("render", "findDOMNode") as typeof import("react-dom");

// Flux
export const Flux = findByProps("Store", "initialize");
export const FluxDispatcher = findByProps("_isDispatching", "dispatch");
