import logger from "./lib/logger";

type ArrayType<T> = T extends Array<infer U> ? U : never;
type AllKeys<T> = T extends any ? keyof T : never;
type OptionalKeys<T> = T extends any
  ? {[K in keyof T]-?: {} extends Pick<T, K> ? K : never}[keyof T]
  : never;
type Idx<T, K extends PropertyKey, D = never> = T extends any
  ? K extends keyof T
    ? T[K]
    : D
  : never;
type PartialKeys<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>> extends infer O
  ? {[P in keyof O]: O[P]}
  : never;
type Widen<T> = [T] extends [object]
  ? PartialKeys<
      {[K in AllKeys<T>]: Widen<Idx<T, K>>},
      Exclude<AllKeys<T>, keyof T> | OptionalKeys<T>
    >
  : T;
type ModifyDeep<A extends AnyObject, B extends DeepPartialAny<A>> = {
  [K in keyof A]: B[K] extends never
    ? A[K]
    : B[K] extends AnyObject
      ? ModifyDeep<A[K], B[K]>
      : B[K]
} & (A extends AnyObject ? Omit<B, keyof A> : A)
type DeepPartialAny<T> = {
  [P in keyof T]?: T[P] extends AnyObject ? DeepPartialAny<T[P]> : any
}
type AnyObject = Record<string, any>

declare global {
    type PropIntellisense<P extends (string | symbol)> = Record<P, any> & Record<PropertyKey, any>;

    interface Window { 
        cordwood: CordwoodObject;
        // TODO: Proper types 
        webpackJsonp: Function;
    }

    interface CordwoodObject {
        util: {
            logger: typeof logger;
        }
        patcher: typeof import("spitroast");
        /// TODO: Typing for common object here?
        webpack: typeof import("@webpack/filters");
    }
}
