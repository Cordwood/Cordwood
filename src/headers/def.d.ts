import * as _spitroast from "spitroast";
import { components } from "@octokit/openapi-types";

// Definition-local types
type LoggerFunction = (content: string) => void;

// Helper types for API functions
type PropIntellisense<P extends string | symbol> = Record<P, any> & Record<PropertyKey, any>;
type SearchFilter = (tree: any) => boolean;
type PropsFinder = <T extends string | symbol>(...props: T[]) => PropIntellisense<T>;
type PropsFinderAll = <T extends string | symbol>(...props: T[]) => PropIntellisense<T>[];
interface FindInTreeOptions {
    walkable?: string[];
    ignore?: string[];
    maxDepth?: number;
}

// Plugin types
interface CordwoodPlugin {
    main: string;
    url: URL;
    manifest: PluginManifest;
}

type PluginManifest = {
    name: string;
    description: string;
    author: string;
    license: string;
};

interface CordwoodSettings {
    fluxLogger?: boolean;
    [key: string | number]: any;
}

interface CordwoodData {
    commitData?: components["schemas"]["commit"][];
    [key: string]: any;
}

// API object
interface CordwoodObject {
    changelog?: string;
    utils: {
        logger: {
            log: LoggerFunction;
            warn: LoggerFunction;
            error: LoggerFunction;
        };
        findInTree: (tree: { [key: string]: any }, filter: SearchFilter, options: FindInTreeOptions) => any;
        findInReactTree: (tree: { [key: string]: any }, filter: SearchFilter) => any;
        createStyle: (styles: Object) => string;
    };
    patcher: {
        after: typeof _spitroast.after;
        before: typeof _spitroast.before;
        instead: typeof _spitroast.instead;
        unpatchAll: typeof _spitroast.unpatchAll;
        injectCSS: (style: string) => () => void;
        clearStyles: () => void;
    };
    webpack: {
        findByProps: PropsFinder;
        findByPropsAll: PropsFinderAll;
        findByDisplayName: (name: string, defaultExp: boolean) => any;
        findByDisplayNameAll: (name: string, defaultExp: boolean) => any[];
    };
    plugins: {
        importPlugin: (url: string) => Promise<CordwoodPlugin>;
        loadPlugin: (plugin: CordwoodPlugin) => Promise<void>;
        loaded: Array<CordwoodPlugin>;
    };
}

// Alyxia's helper types (spaghetti, but awesome)
type ArrayType<T> = T extends Array<infer U> ? U : never;
type AllKeys<T> = T extends any ? keyof T : never;
type OptionalKeys<T> = T extends any ? { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T] : never;
type Idx<T, K extends PropertyKey, D = never> = T extends any ? (K extends keyof T ? T[K] : D) : never;
type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>> extends infer O ? { [P in keyof O]: O[P] } : never;
type Widen<T> = [T] extends [object] ? PartialKeys<{ [K in AllKeys<T>]: Widen<Idx<T, K>> }, Exclude<AllKeys<T>, keyof T> | OptionalKeys<T>> : T;
type ModifyDeep<A extends AnyObject, B extends DeepPartialAny<A>> = {
    [K in keyof A]: B[K] extends never ? A[K] : B[K] extends AnyObject ? ModifyDeep<A[K], B[K]> : B[K];
} & (A extends AnyObject ? Omit<B, keyof A> : A);
type DeepPartialAny<T> = {
    [P in keyof T]?: T[P] extends AnyObject ? DeepPartialAny<T[P]> : any;
};
type AnyObject = Record<string, any>;
