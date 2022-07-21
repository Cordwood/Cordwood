import { React } from "@webpack/common";
import classNames from "classnames";
import TextStyles from "@uikit/styles/text.mod.scss";
import Colors from "@uikit/styles/colors.mod.scss";

export type Tag = "h1" | "h2" | "h3" | "h4" | "h5";
enum Tags {
    H1 = "h1",
    H2 = "h2",
    H3 = "h3",
    H4 = "h4",
    H5 = "h5",
}

interface Props {
    tag: Tag;
    className?: string;
    faded?: boolean;
    children?: string;
    [key: string]: any;
}
interface DefaultProps {
    tag: Tag;
}

export default class FormTitle extends React.PureComponent {
    static displayName = "FormTitle";
    static Tags = Tags;

    declare props: Props;
    static defaultProps: DefaultProps = {
        tag: Tags.H5,
    };

    render() {
        const { tag: Tag, className, children, faded, ...props } = this.props;
        const defaultFontColor = !props.color && Tag !== Tags.H5 ? Colors.defaultColor : null;

        return (
            <Tag
                className={classNames(TextStyles[Tag], className, defaultFontColor, {
                    [TextStyles.faded]: faded,
                })}
                {...props}
            >
                {children}
            </Tag>
        );
    }
}
