import { React } from "@webpack/common";
import { findByProps } from "@webpack/filters";
import { after } from "@lib/patcher";
import initChangelog from "./changelog";
import SettingsView from "./components/SettingsView";

export default function initialize() {
    initChangelog();

    const UserSettingsModal = findByProps("getUserSettingsModalSections");
    const TabBar = findByProps("TabBarItem", "TabBarHeader", "TabBarSeparator");
    after("render", UserSettingsModal.default.prototype, (args, ret) => {
        ret.props.children[0].props.children.props.children[1].push(
            <TabBar.TabBarSeparator />,
            <TabBar.TabBarHeader>Test</TabBar.TabBarHeader>,
            <TabBar.TabBarItem key="cordwood">Plugins</TabBar.TabBarItem>
        );
        if (ret.props.children[0].props.children.props.selectedItem === "cordwood") {
            ret.props.children[1].props.children[0].props.children = <SettingsView />;
        }
    });
}
