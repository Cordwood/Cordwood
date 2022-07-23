import { React } from "@webpack/common";
import Card from "@uikit/components/Card";
import connectStores from "@utils/connectStores";
import DataStore from "@lib/flux/stores/DataStore";
import { components } from "@octokit/openapi-types";
import DataActionCreators from "@lib/flux/actions/DataActionCreators";

class Updater extends React.Component<{ commitData: components["schemas"]["commit"][]; latestFetch: number }> {
    static displayName = "Updater";
    constructor(props = { commitData: [], latestFetch: 0 }) {
        super(props);
        if (DataStore.commitData!.length == 0) {
            DataActionCreators.updateData();
        }
    }

    get outdatedData() {
        const date1 = new Date().getTime();
        const date2 = new Date(this.props.commitData[0].commit.author!.date!).getTime();
        const diffTime = Math.abs(date2 - date1);
        const outdatedDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return {
            outdated: outdatedDays >= 3,
            outdatedDays,
        };
    }

    render() {
        if (this.props.commitData.length > 0)
            return (
                <Card type={Card.Types.PRIMARY}>
                    <Card type={this.outdatedData.outdatedDays > 7 ? Card.Types.DANGER : Card.Types.BRAND}>
                        {this.outdatedData.outdated
                            ? `You're ${this.outdatedData.outdatedDays > 7 ? "over a week" : `${Math.round(this.outdatedData.outdatedDays)} days`} out of date! Please update!`
                            : `Last updated ${Math.round(this.outdatedData.outdatedDays)} day${Math.round(this.outdatedData.outdatedDays) == 1 ? "" : "s"} ago`}
                    </Card>

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
                                <a target={"_blank"} href={`https://github.com/Cordwood/Cordwood/commit/${this.props.commitData[0].sha}`}>
                                    {this.props.commitData[0].sha.substring(0, 7)}
                                </a>{" "}
                                by {this.props.commitData[0].commit.author!.name}: {this.props.commitData[0].commit.message}
                            </div>
                        </div>
                        {/* FIXME: Why the fuck does this button refresh the page??? */}
                        {/*<button className={classNames(ButtonStyles.button, ButtonStyles.buttonPrimary)} onClick={() => DataActionCreators.updateData()}>*/}
                        {/*    Update*/}
                        {/*</button>*/}
                    </div>
                </Card>
            );
    }
}

// @ts-expect-error Inheritance... I should probably add a custom type for `Flux.Store` so it understands.
export default connectStores([DataStore], () => {
    return {
        commitData: DataStore.commitData,
        latestFetch: DataStore.latestFetch,
    };
})(Updater);
