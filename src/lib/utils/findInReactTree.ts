import { findInTree, SearchFilter } from "@lib/utils/findInTree";

export function findInReactTree(tree: {[key: string]: any}, filter: SearchFilter): any {
  return findInTree(tree, filter, { walkable: ['props', 'children', 'return', 'child', 'sibling'] });
}
