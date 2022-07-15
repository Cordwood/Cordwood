import { React } from "@webpack/common";
import { findByProps } from "@webpack/filters";
import { after, injectCSS } from "@lib/patcher";
import initChangelog from "./changelog";
import SettingsView from "./components/SettingsView";

export default function initialize() {
    initChangelog();

    injectCSS(`
        .cordwood-settings-header {
            padding-bottom: 1rem;
        }
        .cordwood-changelog-button {
            display: block !important;
            color: #faa61a !important;
            font-size: 12px !important;
            padding: 8px 6px 10px 20px !important;
            opacity: .7;
            -webkit-transition: opacity .2s ease !important;
            transition: opacity .2s ease;
        }
        .cordwood-changelog-button:hover {
            opacity: 1;
            color: #faa61a
        }
    `)

    const Constants = findByProps("UserSettingsModalSections");
    Object.assign(Constants.UserSettingsModalSections, {
        CORDWOOD: "CORDWOOD",
        CORDWOOD_CHANGELOG: "CORDWOOD_CHANGELOG"
    });

    const UserSettingsModal = findByProps("getUserSettingsModalSections");
    after("getUserSettingsModalSections", UserSettingsModal, (args, ret) => {
        ret.push({
            section: Constants.UserSettingsModalSections.CORDWOOD,
            label: "Cordwood",
            element: SettingsView
        })
        console.log(args)
        console.log(ret)
    })

    const TabBar = findByProps("TabBarItem", "TabBarHeader", "TabBarSeparator");
    after("render", UserSettingsModal.default.prototype, (_, ret) => {
        console.log(ret);
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
