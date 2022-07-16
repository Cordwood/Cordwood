import { React } from "@webpack/common";
import { findByProps } from "@webpack/filters";
import { ASTNode, Capture, Output, Parser, State, UnTypedASTNode } from "simple-markdown";
import { ReactNode } from "react";

const SimpleMarkdown = findByProps("defaultRules", "parserFor") as typeof import("simple-markdown");
const MarkupUtils = findByProps("getDefaultRules", "parserFor");

const DEFAULT_RULES = MarkupUtils.getDefaultRules();
const DEFAULT_LHEADING_RULE = SimpleMarkdown.defaultRules.lheading;
const DEFAULT_LINK_RULE = SimpleMarkdown.defaultRules.link;
const DEFAULT_IMAGE_RULE = SimpleMarkdown.defaultRules.image;

const render = MarkupUtils.parserFor({
    ...DEFAULT_RULES,
    image: { ...DEFAULT_IMAGE_RULE },
    link: { ...DEFAULT_LINK_RULE },
    list: SimpleMarkdown.defaultRules.list,
    lheading: {
        ...DEFAULT_LHEADING_RULE,

        parse(capture: Capture, parse: Parser, state: State): UnTypedASTNode | ASTNode {
            return {
                className: /\{(.+?)}/.exec(capture[1])![1],
                level: capture[2] === "=" ? 1 : 2,
                content: SimpleMarkdown.parseInline(parse, capture[1].replace(/\{.+?}/, ""), state),
            };
        },

        react(node: UnTypedASTNode, output: Output<ReactNode>, state: State) {
            return React.createElement(
                `h${node.level}`,
                {
                    key: state.key,
                    className: node.className,
                },
                output(node.content, state)
            );
        },
    },
});

export default ({ changelog }: { changelog: { body: string; [key: string]: any } }) => {
    // TODO(lexisother): Select a changelog based on commit hash etc etc
    return <p>{render(changelog.body, false)}</p>;
};
