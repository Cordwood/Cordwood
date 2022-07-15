import { findByProps } from "@webpack/filters";
import { after } from "@lib/patcher";
import { FluxDispatcher } from "@webpack/common";

const ChangeLogShower = findByProps("showChangeLog");

export default function init() {
    after("showChangeLog", ChangeLogShower, () => {
        FluxDispatcher.dispatch({
            type: "CHANGE_LOG_OPEN",
        });
    });
}
