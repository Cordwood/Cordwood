import { FluxDispatcher, React } from "@webpack/common";
import { findByDisplayName, findByProps } from "@webpack/filters";
import { after } from "@lib/patcher";
import findInTree from "@utils/findInTree";
import initChangelog from "./changelog";
import SettingsView from "./views/SettingsView";
import Changelog from "./views/Changelog";
import styles from "@styles/core.scss";
import AboutView from "@/ui/settings/views/AboutView";

export default function initialize() {
    initChangelog();

    const Constants = findByProps("UserSettingsModalSections");
    Object.assign(Constants.UserSettingsModalSections, {
        CORDWOOD_ABOUT: "CORDWOOD_ABOUT",
        CORDWOOD_SETTINGS: "CORDWOOD_SETTINGS",
        CORDWOOD_PLUGINS: "CORDWOOD_PLUGINS",
    });

    const UserSettingsModal = findByProps("getUserSettingsModalSections");
    after("getUserSettingsModalSections", UserSettingsModal, (_, ret) => {
        ret.push({
            section: Constants.UserSettingsModalSections.CORDWOOD_SETTINGS,
            label: "Cordwood",
            element: SettingsView,
        });
    });

    const TabBar = findByProps("TabBarItem", "TabBarHeader", "TabBarSeparator");
    after("render", UserSettingsModal.default.prototype, (_, ret) => {
        const settingsHeader = findInTree(ret, (t) => t?.selectedItem);
        const settingsInner = findInTree(ret, (t) => t.props?.className.trim?.() === "settings-inner")
        settingsHeader.children[1].push(
            <TabBar.TabBarHeader className={styles.cordwoodSettingsHeader}>Cordwood</TabBar.TabBarHeader>,
            <TabBar.TabBarItem key="CORDWOOD_ABOUT">About</TabBar.TabBarItem>,
            <TabBar.TabBarItem key="CORDWOOD_SETTINGS">Settings</TabBar.TabBarItem>,

            <div
                className={styles.cordwoodChangelogButton}
                onClick={() => {
                    applyPatches();
                    FluxDispatcher.dispatch({ type: "CHANGE_LOG_OPEN" });
                }}
            >
                Cordwood Change Log
            </div>
        );
        if (settingsHeader.selectedItem === "CORDWOOD_ABOUT") {
            settingsInner.props.children = <AboutView />
        }
        if (settingsHeader.selectedItem === "CORDWOOD_SETTINGS") {
            settingsInner.props.children = <SettingsView />;
        }
    });
}

function applyPatches() {
    const MarkdownModal = findByDisplayName("MarkdownModal");

    // lexisother: I fucking love this patch. Thanks Ducko.
    after(
        "render",
        MarkdownModal.prototype,
        (_, ret) => {
            if (!ret.props.className.includes("change-log")) return ret;

            // TODO(lexisother): Rework this entire thing into its own system,
            //  purely for generalisation purposes. This is really dirty now.
            const CHANGELOGS = window
                .cordwood!.changelog!.replace(/\r/g, "")
                .split("---changelog---\n")
                .slice(1)
                .map((changelog) => {
                    let reachedConfigEnd = false;
                    const config: { [key: string]: any } = {};
                    const body = changelog
                        .split("\n")
                        .filter((line) => {
                            if (line === "---") {
                                reachedConfigEnd = true;
                                return false;
                            }

                            if (!reachedConfigEnd) {
                                const params = line.split(": ");
                                const key = params.shift()!;
                                const value = params.join(": ");
                                config[key] = JSON.parse(value);
                            }

                            return reachedConfigEnd;
                        })
                        .join("\n");
                    return { ...config, body };
                });

            const changelog: { body: string; [key: string]: any } = CHANGELOGS[0];

            // TODO(lexisother): Add a proper changelog system!
            //   Hash checking and the likes. As well as actually
            //   rendering using Discord's fancy Markdown
            //   rendering system. See the sourcemaps for that.
            const header = ret.props.children[0].props.children[0];
            header[0].props.children = "Cordwood Changelog";
            header[1] = ` (${changelog.date})`;

            const footer = ret.props.children[2].props.children;
            footer[1].props.href = "https://github.com/Cordwood/Cordwood/blob/master/CHANGELOG.md";

            const content = ret.props.children[1];
            content.props.children[0] = null; // remove video
            content.props.children[1] = [<Changelog changelog={changelog} />];

            return ret;
        },
        true
    );
}
