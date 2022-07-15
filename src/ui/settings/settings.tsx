import { FluxDispatcher, React } from "@webpack/common";
import { findByDisplayName, findByProps } from "@webpack/filters";
import { after } from "@lib/patcher";
import initChangelog from "./changelog";
import SettingsView from "./components/SettingsView";
import Changelog from "./components/Changelog";

export default function initialize() {
    initChangelog();

    const Constants = findByProps("UserSettingsModalSections");
    Object.assign(Constants.UserSettingsModalSections, {
        CORDWOOD: "CORDWOOD",
        CORDWOOD_CHANGELOG: "CORDWOOD_CHANGELOG",
    });

    const UserSettingsModal = findByProps("getUserSettingsModalSections");
    after("getUserSettingsModalSections", UserSettingsModal, (_, ret) => {
        ret.push({
            section: Constants.UserSettingsModalSections.CORDWOOD,
            label: "Cordwood",
            element: SettingsView,
        });
    });

    const TabBar = findByProps("TabBarItem", "TabBarHeader", "TabBarSeparator");
    const MarkdownModal = findByDisplayName("MarkdownModal");
    after("render", UserSettingsModal.default.prototype, (_, ret) => {
        ret.props.children[0].props.children.props.children[1].push(
            <TabBar.TabBarHeader className="cordwood-settings-header">Cordwood</TabBar.TabBarHeader>,
            <TabBar.TabBarItem key="CORDWOOD">Plugins</TabBar.TabBarItem>,

            <div
                className="cordwood-changelog-button"
                onClick={() => {
                    // lexisother: I fucking love this patch. Thanks Ducko.
                    after(
                        "render",
                        MarkdownModal.prototype,
                        (_, ret) => {
                            if (!ret.props.className.includes("change-log")) return ret;

                            // TODO(lexisother): Add a proper changelog system!
                            // Hash checking and the likes. As well as actually
                            // rendering using Discord's fancy Markdown
                            // rendering system. See the sourcemaps for that.
                            const header = ret.props.children[0].props.children[0];
                            header[0].props.children = "Cordwood Changelog";
                            header[1] = " (Jul 13, 2022)";

                            const content = ret.props.children[1];
                            content.props.children[0] = null; // remove video
                            content.props.children[1] = [<Changelog changelog={window.cordwood!.changelog} />];

                            return ret;
                        },
                        true
                    );
                    FluxDispatcher.dispatch({ type: "CHANGE_LOG_OPEN" });
                }}
            >
                Cordwood Change Log
            </div>
        );
        if (ret.props.children[0].props.children.props.selectedItem === "CORDWOOD") {
            ret.props.children[1].props.children[0].props.children = <SettingsView />;
        }
    });
}
