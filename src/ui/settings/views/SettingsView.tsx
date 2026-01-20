import { React } from "@webpack/common";
import { findByCode, findByDisplayName, findByProps } from "@webpack/filters";
import connectStores from "@utils/connectStores";
import SettingsStore from "@lib/flux/stores/SettingsStore";
import SettingsActionCreators from "@lib/flux/actions/SettingsActionCreators";

const Scroller = findByDisplayName("Scroller");
const { FormSection, FormTitle } = findByProps("FormSection");
// const Checkbox = findByCode("CHECKBOX_REF");
const SwitchItem = findByCode(/.{1,2}\.Sizes=.*?,.{1,2}\.Themes=.*?,/);

// TODO: Rewrite with UIKit.
class SettingsView extends React.PureComponent<{ fluxLogger?: boolean }> {
    static displayName = "SettingsView";
    constructor(props = {}) {
        super(props);
    }

    render() {
        return (
            <FormSection title="Cordwood Settings" tag={FormTitle.Tags.H2}>
                <SwitchItem
                    note="This can clog up your console."
                    size={SwitchItem.Sizes.DEFAULT}
                    theme={SwitchItem.Themes.DEFAULT}
                    onChange={(v: { target: { checked: boolean } }) => {
                        SettingsActionCreators.setFlux(v.target.checked);
                    }}
                    value={this.props.fluxLogger}
                >
                    Log everything that passes through the Flux Dispatcher.
                </SwitchItem>
            </FormSection>
        );
    }
}

// @ts-expect-error Inheritance... I should probably add a custom type for `Flux.Store` so it understands.
export default connectStores([SettingsStore], () => {
    return {
        fluxLogger: SettingsStore.fluxLogger,
    };
})(SettingsView);
