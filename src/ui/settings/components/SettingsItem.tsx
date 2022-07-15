import { React } from "@webpack/common";
import { findByProps } from "@webpack/filters";

const { TabBarItem } = findByProps("TabBarItem");

// TODO: CSS INJECTION
export default ({ key = "", separator = false, children }: { key: string; separator: boolean; children: JSX.Element[] }) => (
    <TabBarItem key={key} class={`tab-bar-item${separator ? " separator" : ""}`}>
        {children}
    </TabBarItem>
);
