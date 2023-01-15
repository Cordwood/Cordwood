import { findByProps } from "@webpack/filters";
import { before } from "@lib/patcher";
import { React } from "@webpack/common";

const RouterComponent = findByProps("Router") as unknown as React.Component & { Router: { prototype: any } };

interface IRouter {
    props: any;
    componentWillMount(): void;
    componentWillUnmount(): void;
}

export default function init() {
    /**
     * @author redstonekasi
     */
    before(
        "render",
        RouterComponent.Router.prototype,
        function () {
            // @ts-expect-error Yes, TypeScript, I am trying to type `this`.
            let ithis = this as IRouter;
            // Push to the root route
            ithis.props.children[1].props.children.push(
                // @ts-expect-error shut up about call signatures
                <RouterComponent path="/cordwood" component={() => <div>Cordwood route</div>} />
                // React.createElement(RouterComponent, {
                //     path: "/cordwood",
                //     component: () => React.createElement("div", undefined, "Cordwood route"),
                // })
            );

            // Ensure that the old transition manager isn't listening anymore
            ithis.componentWillUnmount();
            // Make router recreate routes from children
            ithis.componentWillMount();
        },
        true
    );
}
