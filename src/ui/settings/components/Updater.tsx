import { React } from "@webpack/common";
import Card from "@uikit/components/Card";
import classNames from "classnames";
import connectStores from "@utils/connectStores";
import ButtonStyles from "@uikit/styles/button.mod.scss";
import DataStore from "@lib/flux/stores/DataStore";
import { components } from "@octokit/openapi-types";

class Updater extends React.Component<{ commitData: components["schemas"]["commit"][] }> {
    static displayName = "Updater";
    constructor(props = { commitData: [] }) {
        super(props);
    }

    render() {
        return (
            <Card type={Card.Types.PRIMARY}>
                <Card type={Card.Types.BRAND}>Last updated 3 days ago</Card>

                <div
                    style={{
                        display: "flex",
                        flex: "1 1 auto",
                        alignItems: "stretch",
                        justifyContent: "flex-start",
                        flexWrap: "nowrap",
                        flexDirection: "row",
                        boxSizing: "border-box",
                    }}
                >
                    <div style={{ marginLeft: 0, flex: "1 1 auto" }}>
                        <div>Last update:</div>
                        <div>
                            <a href={"https://google.com"}>8fba85b</a> by Alyxia Sother: commit message
                        </div>
                    </div>
                    <button className={classNames(ButtonStyles.button, ButtonStyles.buttonPrimary)}>Update</button>
                </div>
            </Card>
        );
    }
}

// @ts-expect-error Inheritance... I should probably add a custom type for `Flux.Store` so it understands.
export default connectStores([DataStore], () => {
    return {
        commitData: DataStore.commitData,
    };
})(Updater);
