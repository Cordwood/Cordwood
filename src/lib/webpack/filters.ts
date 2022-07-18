import wpRequire from "./wpRequire";

const filterModules =
    (modules: any[], single = false) =>
    (filter: (m: any) => boolean) => {
        let foundModules = [];

        for (const mod in modules) {
            if (modules.hasOwnProperty(mod)) {
                const module = modules[mod].exports;

                if (!module) continue;

                if (module.default && module.__esModule && filter(module.default)) {
                    if (single) return module.default;
                    foundModules.push(module.default);
                }

                if (filter(module)) {
                    if (single) return module;
                    else foundModules.push(module);
                }
            }
        }
        if (!single) return foundModules;
    };

export const modules = wpRequire.c;

export const find = filterModules(modules, true);
export const findAll = filterModules(modules);

const propsFilter = (props: (string | symbol)[]) => (m: any) => props.every((p) => m[p] !== undefined);
const dNameFilter = (name: string, defaultExp: boolean) => (defaultExp ? (m: any) => m.displayName === name : (m: any) => m?.default?.displayName === name);

export const findByProps: PropsFinder = (...props) => find(propsFilter(props));
export const findByPropsAll: PropsFinderAll = (...props) => findAll(propsFilter(props));
export const findByDisplayName = (name: string, defaultExp = true) => find(dNameFilter(name, defaultExp));
export const findByDisplayNameAll = (name: string, defaultExp = true) => findAll(dNameFilter(name, defaultExp));
