import { findByProps } from "@webpack/filters";
import { after } from "@lib/patcher";
import { FluxDispatcher } from "@webpack/common";

const ChangeLog = findByProps("showChangeLog");

export default function init() {
  after("showChangeLog", ChangeLog, () => {
    FluxDispatcher.dispatch({
      type: "CHANGE_LOG_OPEN"
    })
  })
}

