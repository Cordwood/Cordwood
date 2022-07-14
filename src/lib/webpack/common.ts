import { findByProps } from "@webpack/filters";

// React
export const React = findByProps("createElement");
export const ReactDOM = findByProps("render", "findDOMNode")

// Flux
export const Flux = findByProps("Store", "initialize");
export const FluxDispatcher = findByProps("_isDispatching", "dispatch");
