import { React } from "@webpack/common";
import { findByProps } from "@webpack/filters";
import { after } from "@lib/patcher";
import initChangelog from "./changelog";
import SettingsView from "./components/SettingsView";

export default function initialize() {
    initChangelog();

    const Constants = findByProps("UserSettingsModalSections");
    Object.assign(Constants.UserSettingsModalSections, {
        CORDWOOD: "CORDWOOD",
        CORDWOOD_CHANGELOG: "CORDWOOD_CHANGELOG",
    });

    const UserSettingsModal = findByProps("getUserSettingsModalSections");
    after("getUserSettingsModalSections", UserSettingsModal, (args, ret) => {
        ret.push({
            section: Constants.UserSettingsModalSections.CORDWOOD,
            label: "Cordwood",
            element: SettingsView,
        });
    });

    const TabBar = findByProps("TabBarItem", "TabBarHeader", "TabBarSeparator");
    after("render", UserSettingsModal.default.prototype, (_, ret) => {
        ret.props.children[0].props.children.props.children[1].push(
            <TabBar.TabBarHeader className="cordwood-settings-header">Cordwood</TabBar.TabBarHeader>,
            <TabBar.TabBarItem key="CORDWOOD">Plugins</TabBar.TabBarItem>,

            <TabBar.TabBarItem key="CORDWOOD_CHANGELOG" className="cordwood-changelog-button">
                Cordwood Change Log
            </TabBar.TabBarItem>
        );
        if (ret.props.children[0].props.children.props.selectedItem === "CORDWOOD") {
            ret.props.children[1].props.children[0].props.children = <SettingsView />;
        }
        if (ret.props.children[0].props.children.props.selectedItem === "CORDWOOD_CHANGELOG") {
            // TODO: Modal popup
        }
    });
}
