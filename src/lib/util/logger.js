const log = (content, color, type) => {
    console[type]("%cCordwood%c", `background-color: ${color}; border-radius: 16px; padding: 0px 5px 0px 5px;`, "", content)
}

export default {
    log: (content) => log(content, "#708724", "log"),
}