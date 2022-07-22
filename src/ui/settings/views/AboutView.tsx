import { React } from "@webpack/common";
import { findByDisplayName } from "@webpack/filters";
import Updater from "@/ui/settings/components/Updater";
import FormTitle from "@uikit/components/FormTitle";

const Scroller = findByDisplayName("Scroller");

export default class AboutView extends React.Component {
    static displayName = "AboutView";

    render() {
        return (
            <Scroller className={"settings-wrapper settings-panel"}>
                <img style={{ width: "100%" }} src={"https://raw.githubusercontent.com/Cordwood/Cordwood/master/.assets/cordwood-transparent-black.png"} />

                <Updater />

                <FormTitle tag={FormTitle.Tags.H5}>Made with ❤️ by Beef and Alyxia</FormTitle>
            </Scroller>
        );
    }
}
