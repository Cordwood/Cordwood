import { findByDisplayName, findByProps } from "@webpack/filters";
import { after } from "@lib/patcher";
import { FluxDispatcher } from "@webpack/common";

const ChangeLogShower = findByProps("showChangeLog");
const ChangeLog = findByDisplayName("ChangeLog");

export default function init() {
  after("showChangeLog", ChangeLogShower, () => {
    FluxDispatcher.dispatch({
      type: "CHANGE_LOG_OPEN"
    });
  });

  after("renderHeader", ChangeLog.prototype, (args, ret) => {
    return "hi"
    // console.log(args);
    // console.log(ret);
  });
}

