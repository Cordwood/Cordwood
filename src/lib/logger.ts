const log = (content: string, color: string, type: "log" | "warn" | "error") => {
    console[type]("%cCordwood%c", `background-color: ${color}; color: black; font-weight: 600; border-radius: 16px; padding: 0px 5px 0px 5px;`, "", content)
}

export default {
    log: (content: string) => log(content, "#b6c76c", "log"),
    warn: (content: string) => log(content, "#e19c3d", "warn"),
    error: (content: string) => log(content, "#a63d40", "error"),
}