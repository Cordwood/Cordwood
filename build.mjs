import alias from "esbuild-plugin-alias";
import { build } from "esbuild";
import fs from "fs/promises";
import { readFileSync } from "fs";
import path from "path";

const tsconfig = JSON.parse(await fs.readFile("./tsconfig.json"));
const aliases = Object.fromEntries(Object.entries(tsconfig.compilerOptions.paths).map(([alias, [target]]) => [alias, path.resolve(target)]));
const changelog = readFileSync("./CHANGELOG.md").toString();

const define = {};
for (const k in process.env) {
    define[`process.env.${k}`] = JSON.stringify(process.env[k]);
}

process.env.DEV === "true" ? (define[`process.env.__CHANGELOG__`] = JSON.stringify(changelog)) : "";

try {
    await build({
        entryPoints: ["./src/index.ts"],
        outfile: "./dist/index.js",
        minify: true,
        bundle: true,
        format: "iife",
        external: ["react"],
        target: "esnext",
        define,
        plugins: [alias(aliases)],
    });

    await fs.appendFile("./dist/index.js", "//# sourceURL=Cordwood");
    console.log("Build successful!");
} catch (e) {
    console.error("Build failed...", e);
    process.exit(1);
}
