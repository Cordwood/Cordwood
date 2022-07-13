import alias from "esbuild-plugin-alias";
import { build } from "esbuild";
import fs from "fs";
import path from "path";

const tsconfig = JSON.parse(fs.readFileSync("./tsconfig.json"));
const aliases = Object.fromEntries(
    Object.entries(tsconfig.compilerOptions.paths).map(([alias, [target]]) => [
        alias,
        path.resolve(target)
    ])
);

build({
    entryPoints: ["./src/index.ts"],
    outfile: "./dist/index.js",
    minify: true,
    bundle: true,
    format: "iife",
    external: ["react"],
    target: "esnext",
    plugins: [
        alias(aliases)
    ]
})