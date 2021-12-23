import esbuild from "esbuild";
import alias from "esbuild-plugin-alias";
import { resolve } from "path";
import { appendFile } from "fs";

try {
    await esbuild.build({
        entryPoints: ["src/index.js"],
        outfile: "dist/build.js",
        minify: true,
        bundle: true,
        format: "iife",
        plugins: [
            alias({
                util: resolve("./src/lib/util/util.js"),
            }),
        ],
    });
    appendFile('./dist/build.js', `//# sourceURL=Cordwood`);
    console.log("Build successful!");
} catch (e) {
    console.error("Oops...", e);
    process.exit();
}
