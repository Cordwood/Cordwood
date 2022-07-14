import { React } from "@webpack/common";
import { findByProps } from "@webpack/filters";
import { after } from "@lib/patcher";
import initChangelog from "./changelog";

// TODO: This needs to use findInReactTree

export default function initialize() {
    initChangelog();

    const UserSettingsModal = findByProps("getUserSettingsModalSections");
    const TabBar = findByProps("TabBarItem");
    after("render", UserSettingsModal.default.prototype, (args, ret) => {
        ret.props.children[0].props.children.props.children[1].push(
            React.createElement(TabBar.TabBarItem, { key: "cordwood" }, "Plugins")
        );
        if (ret.props.children[0].props.children.props.selectedItem === "cordwood") {
            ret.props.children[1].props.children[0].props.children = React.createElement("h1", {}, "hi");
        }
    });
}
