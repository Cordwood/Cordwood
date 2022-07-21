import { React } from "@webpack/common";
import { findByDisplayName } from "@webpack/filters";
import connectStores from "@utils/connectStores";
import SettingsStore from "@lib/flux/stores/SettingsStore";
import SettingsActionCreators from "@lib/flux/actions/SettingsActionCreators";

const Scroller = findByDisplayName("Scroller");
const Checkbox = findByDisplayName("Checkbox");

// TODO: Rewrite with UIKit.
class SettingsView extends React.Component<{ fluxLogger?: boolean }> {
    constructor(props = {}) {
        super(props);
    }

    render() {
        return (
            <Scroller className={"settings-wrapper settings-panel"}>
                <div className={"control-groups"}>
                    <div className={"control-group"}>
                        <label>Debug Settings</label>
                        <ul className={"checkbox-group"}>
                            <li>
                                <Checkbox
                                    onChange={(v: { target: { checked: boolean } }) => {
                                        SettingsActionCreators.setFlux(v.target.checked);
                                    }}
                                    defaultChecked={this.props.fluxLogger}
                                >
                                    Log everything that passes through the Flux Dispatcher.
                                </Checkbox>
                            </li>
                            <li>
                                <div className={"help-text"}>Note that this will clog up your console.</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </Scroller>
        );
    }
}

// @ts-expect-error Inheritance... I should probably add a custom type for `Flux.Store` so it understands.
export default connectStores([SettingsStore], () => {
    return {
        fluxLogger: SettingsStore.fluxLogger,
    };
})(SettingsView);
