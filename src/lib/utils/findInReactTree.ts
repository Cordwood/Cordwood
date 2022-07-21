import findInTree from "@utils/findInTree";
import { SearchFilter } from "@/headers/def";

export default function findInReactTree(tree: { [key: string]: any }, filter: SearchFilter): any {
    findInTree(tree, filter, {
        walkable: ["props", "children", "child", "sibling"],
    });
}
