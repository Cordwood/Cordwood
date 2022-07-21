import { React } from "@webpack/common";
import { findByDisplayName } from "@webpack/filters";

const Scroller = findByDisplayName("Scroller");

export default class AboutView extends React.Component {
    static displayName = "AboutView";

    render() {
        return (
            <Scroller className={"settings-wrapper settings-panel"}>
                <img style={{ width: "100%" }} src={"https://raw.githubusercontent.com/Cordwood/Cordwood/master/.assets/cordwood-transparent-black.png"} />
                <p style={{ position: "absolute", bottom: 0 }}>Made with ❤️ by Beef and Alyxia</p>
            </Scroller>
        );
    }
}
