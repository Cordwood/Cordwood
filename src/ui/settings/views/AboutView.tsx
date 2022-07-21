import { React } from "@webpack/common";
import { findByDisplayName } from "@webpack/filters";
import FormTitle from "@/ui/settings/components/FormTitle";

const Scroller = findByDisplayName("Scroller");

export default class AboutView extends React.Component {
    static displayName = "AboutView";

    render() {
        return (
            <Scroller className={"settings-wrapper settings-panel"}>
                <FormTitle tag={FormTitle.Tags.H1}>Cordwood</FormTitle>
            </Scroller>
        );
    }
}
