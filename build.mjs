import { buildSync } from "esbuild";

buildSync({
    entryPoints: ["./src/index.ts"],
    outfile: "./dist/index.js",
    minify: true,
    bundle: true,
    format: "iife",
    external: ["react"],
    target: "esnext",
})