import { findInTree, SearchFilter } from "@utils/findInTree";

export function findInReactTree(tree: { [key: string]: any }, filter: SearchFilter): any {
    findInTree(tree, filter, {
        walkable: ["props", "children", "child", "sibling"],
    });
}
