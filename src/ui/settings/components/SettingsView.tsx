import { React } from "@webpack/common";
import { findByDisplayName } from "@webpack/filters";
import connectStores from "@utils/connectStores";
import SettingsStore from "@lib/flux/stores/SettingsStore";
import SettingsActionCreators from "@lib/flux/actions/SettingsActionCreators";

const Checkbox = findByDisplayName("Checkbox");

class SettingsView extends React.Component<{ switch?: boolean }> {
    constructor(props = {}) {
        super(props);
        this.state = {
            toggled: 0,
        };
    }

    render() {
        return (
            <div className="margin-top-20">
                <Checkbox
                    onChange={(v: { target: { checked: boolean } }) => {
                        SettingsActionCreators.setSwitch(v.target.checked);
                    }}
                    defaultChecked={this.props.switch}
                />
            </div>
        );
    }
}

// @ts-expect-error Inheritance... I should probably add a custom type for `Flux.Store` so it understands.
export default connectStores([SettingsStore], () => {
    return {
        switch: SettingsStore.getSwitch(),
    };
})(SettingsView);
