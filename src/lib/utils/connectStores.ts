// @ts-nocheck

import { React } from "@webpack/common";

type Diff<A, B> = { [K in Exclude<keyof A, B>]: A[K] };
type Class<T> = { new (): T };
type ReactClass<DefaultProps, Props> = Class<React.Component<DefaultProps, Props, any>>;

interface Store {
    addChangeListener(callback: Function): void;
    removeChangeListener(callback: Function): void;
}

function shallowEqual(a: Record<string, any>, b: Record<string, any>, ignore?: Array<string>): boolean {
    if (a === b) {
        return true;
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
        return false;
    }

    for (let i = 0; i < keysA.length; i++) {
        const key = keysA[i];
        if (a[key] !== b[key] && (ignore == null || ignore.indexOf(key) === -1)) {
            return false;
        }
    }

    return true;
}

function getDisplayName(Component: ReactClass<any, any>): string {
    return Component.displayName || Component.name || "Component";
}

export default function connectStores<DefaultProps, Props, State>(stores: Array<Store>, getStateFromStores: (props: Props) => State): (Component: ReactClass<DefaultProps, Props>) => ReactClass<DefaultProps, Diff<Props, State>> {
    return (Component) => {
        return class extends React.Component<any, any, any> {
            static displayName = `FluxContainer(${getDisplayName(Component)})`;

            constructor(props: any) {
                super(props);

                this.state = getStateFromStores(props);

                this._handleStoreChange = this._handleStoreChange.bind(this);
            }

            _handleStoreChange() {
                this.setState(getStateFromStores(this.props));
            }

            componentWillMount() {
                stores.forEach((store) => {
                    store.addChangeListener(this._handleStoreChange);
                });
            }

            componentWillReceiveProps(nextProps: Props) {
                if (!shallowEqual(this.props, nextProps)) {
                    this.setState(getStateFromStores(nextProps));
                }
            }

            componentWillUnmount() {
                stores.forEach((store) => store.removeChangeListener(this._handleStoreChange));
            }

            render() {
                return React.createElement(Component, { ...this.props, ...this.state }, null);
            }
        };
    };
}
