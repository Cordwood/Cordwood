import { autoApi } from "@cumjar/websmack";

export const {
    find,
    findAll,
    findByCode,
    findByCodeAll,
    findByDisplayName,
    findByDisplayNameAll,
    findByDispNameDeep,
    findByDispNameDeepAll,
    findByKeyword,
    findByKeywordAll,
    findByNestedProps,
    findByNestedPropsAll,
    findByProps,
    findByPropsAll,
    findByPrototypes,
    findByPrototypesAll,
    batchFind,
} = autoApi();
