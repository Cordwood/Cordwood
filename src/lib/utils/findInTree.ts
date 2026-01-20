/*
  Disclaimer: https://github.com/Cumcord/Cumcord/blob/1f88853091087e39c64d9f769ea4895763412a6a/src/api/utils/findInTree.js
 */

import { FindInTreeOptions, SearchFilter } from "@/headers/def";

export default function findInTree(tree: { [key: string]: any }, searchFilter: SearchFilter, { walkable = [], ignore = [], maxDepth = 100 }: FindInTreeOptions = {}) {
    let iteration = 0;

    function doSearch(tree: { [key: string]: any }, filter: SearchFilter, { walkable = [], ignore = [] }: FindInTreeOptions = {}): any {
        iteration += 1;
        if (iteration > maxDepth) return;

        if (typeof searchFilter === "string") {
            if (tree.hasOwnProperty(searchFilter)) return tree[searchFilter];
        } else if (searchFilter(tree)) return tree;

        if (!tree) return;

        if (Array.isArray(tree)) {
            for (const item of tree) {
                const found = doSearch(item, searchFilter, { walkable, ignore });
                if (found) return found;
            }
        } else if (typeof tree === "object") {
            for (const key of Object.keys(tree)) {
                if (walkable != null && !walkable.includes(key)) continue;

                if (ignore.includes(key)) continue;

                try {
                    const found = doSearch(tree[key], searchFilter, { walkable, ignore });
                    if (found) return found;
                } catch {}
            }
        }
    }

    return doSearch(tree, searchFilter, { walkable, ignore });
}

export const findInReactTree = (tree: { [key: string]: any }, searchFilter: SearchFilter) => findInTree(tree, searchFilter, { walkable: ["props", "children", "child", "sibling"] });
