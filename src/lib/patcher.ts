import * as spitroast from "spitroast";

export function injectCSS(style: string) {
    let injectedStyle = document.createElement("style");
    injectedStyle.id = "CORDWOOD_INJECTED_STYLE";
    injectedStyle.innerHTML = style;
    document.head.appendChild(injectedStyle);

    return () => {
        injectedStyle.remove();
    };
}

export * from "spitroast";
export default { ...spitroast, injectCSS };
