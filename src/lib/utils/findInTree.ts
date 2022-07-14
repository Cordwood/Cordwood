export interface FindInTreeOptions {
  walkable?: string[];
  ignore?: string[];
  maxDepth?: number;
  silentFailDepth?: number;
}

export type SearchFilter = (tree: any) => boolean;

const { hasOwnProperty } = Object.prototype;

function findInTreeInner(tree: {[key: string]: any}, filter: SearchFilter | string, options: FindInTreeOptions = {}, cache: object[] = [], depth = 0): any {
  if (typeof tree !== 'object' || !tree) return null;
  const { walkable, ignore = [], maxDepth = 150, silentFailDepth = false } = options;

  if (depth >= maxDepth) {
    if (silentFailDepth) return null;
    throw new Error(`Max depth of ${maxDepth} exceeded!`);
  }

  if (typeof filter === 'string') {
    if (hasOwnProperty.call(tree, filter)) return tree[filter];
  } else if (filter(tree)) return tree;

  if (Array.isArray(tree)) {
    for (let i = 0, len = tree.length; i < len; i++) {
      const value = tree[i];
      if (typeof value === 'object') {
        if (cache.findIndex(e => e === value) !== -1) continue;
        cache.push(value);
      }
      const ret = findInTreeInner(value, filter, options, cache, depth + 1);
      if (ret !== null) return ret;
    }
  } else {
    const keys = walkable || Object.keys(tree);
    for (let i = 0, len = keys.length; i < len; i++) {
      const key = keys[i];
      if (!hasOwnProperty.call(tree, key) || ignore.indexOf(key) !== -1) continue;
      const value = tree[key];
      if (typeof value === 'object') {
        if (cache.findIndex(e => e === value) !== -1) continue;
        cache.push(value);
      }
      const ret = findInTreeInner(value, filter, options, cache, depth + 1);
      if (ret !== null) return ret;
    }
  }
  return null;
}

export function findInTree(tree: {[key: string]: any}, filter: SearchFilter | string, options: FindInTreeOptions = {}): any {
  try {
    return findInTreeInner(tree, filter, options);
  } catch (err: any) {
    throw new Error(err.message);
  }
}
