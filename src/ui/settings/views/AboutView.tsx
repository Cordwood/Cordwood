import { React } from "@webpack/common";
import { findByDisplayName } from "@webpack/filters";
import Card from "@uikit/components/Card";
import ButtonStyles from "@uikit/styles/button.mod.scss";
import classNames from "classnames";

const Scroller = findByDisplayName("Scroller");

export default class AboutView extends React.Component {
    static displayName = "AboutView";

    // TODO: Turn this into a component and use class names
    renderUpdater() {
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

    render() {
        return (
            <Scroller className={"settings-wrapper settings-panel"}>
                <img style={{ width: "100%" }} src={"https://raw.githubusercontent.com/Cordwood/Cordwood/master/.assets/cordwood-transparent-black.png"} />

                {this.renderUpdater()}

                <Card type={Card.Types.PRIMARY} outline={true}>
                    Hi
                </Card>
                <Card type={Card.Types.SUCCESS} outline={true}>
                    Hi
                </Card>
                <Card type={Card.Types.WARNING} outline={true}>
                    Hi
                </Card>
                <Card type={Card.Types.DANGER} outline={true}>
                    Hi
                </Card>
                <Card type={Card.Types.BRAND} outline={true}>
                    Hi
                </Card>
                <p style={{ position: "absolute", bottom: 0 }}>Made with ❤️ by Beef and Alyxia</p>
            </Scroller>
        );
    }
}
