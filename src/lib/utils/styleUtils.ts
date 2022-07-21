import logger from "@lib/logger";

function upperCaseFirstChar(str: string): string {
    if (str == null || typeof str !== "string") {
        return "";
    }
    return `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;
}

export function getClass(Styles: Record<string, string>, name: string, ...args: Array<string>): string {
    const modes = args.reduce((acc, mode) => acc + upperCaseFirstChar(mode), "");
    const className = `${name}${modes}`;
    const hashedClassName = Styles[className];

    if (hashedClassName == null) {
        if (process.env.DEV) {
            logger.warn(`Class doesn't exist: ${name} ${className}`);
        }
        return "";
    }

    return hashedClassName;
}
