import { React } from "@webpack/common";
import { findByDisplayName } from "@webpack/filters";

const Checkbox = findByDisplayName("Checkbox")

export default class SettingsView extends React.Component {
  constructor(props = {}) {
    super(props);
    this.state = {
      toggled: 0
    };
  }

  render() {
    return (
      <div className="margin-top-20">
        <Checkbox
          onChange={(v: boolean) => console.log(v)}
          value={false}
        />
      </div>
    )
  }
}
