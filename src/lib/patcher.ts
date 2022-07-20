import * as spitroast from "spitroast";

const injectedStyles = new Array<() => void>();

export function injectCSS(style: string) {
    let injectedStyle = document.createElement("style");
    injectedStyle.id = "CORDWOOD_INJECTED_STYLE";
    injectedStyle.innerHTML = style;
    document.head.appendChild(injectedStyle);

    injectedStyles.push(uninject);

    function uninject() {
        injectedStyle.remove();
    };

    return uninject;
}

export function clearStyles() {
    for (const uninject of injectedStyles) {
        uninject();
    }
}

export * from "spitroast";
export default { ...spitroast, injectCSS, clearStyles };
