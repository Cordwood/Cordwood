import * as util from "util";

export default () => {
    window.cordwood = {
        util: {
            logger: util.logger,
        }
    }
}