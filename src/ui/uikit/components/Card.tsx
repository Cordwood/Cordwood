import { React } from "@webpack/common";
import classNames from "classnames";
import Styles from "@uikit/styles/card.mod.scss";
import { getClass } from "@utils/styleUtils";

const Types = {
    PRIMARY: "cardPrimary",
    DANGER: "cardDanger",
    WARNING: "cardWarning",
    SUCCESS: "cardSuccess",
    BRAND: "cardBrand",
    CUSTOM: "cardCustom",
};

interface Props {
    type: string;
    outline?: boolean;
    className?: string;
    children?: any;
}
interface DefaultProps {
    type: string;
    outline: boolean;
}

export default class Card extends React.PureComponent {
    static displayName = "Card";
    static Types = Types;

    declare props: Props;
    static defaultProps: DefaultProps = {
        type: Types.PRIMARY,
        outline: true,
    };

    render() {
        const { children, type, className, outline, ...attrs } = this.props;

        let mode = "";
        if (outline) mode = "outline";

        return (
            <div className={classNames(Styles.card, className, getClass(Styles, type, mode))} {...attrs}>
                {children}
            </div>
        );
    }
}
