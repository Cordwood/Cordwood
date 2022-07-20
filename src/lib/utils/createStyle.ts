export default function createStyle(styles: Object) {
    let stylesToCombine = new Array<string>();

    for (let [k, v] of Object.entries(styles)) {
        const mappedStyles = Object.entries(v)
            .map(([k, v]) => `${k.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}:${v}`)
            .join(";");

        stylesToCombine.push(`${k}{${mappedStyles}}`);
    };

    return stylesToCombine.join("");
}