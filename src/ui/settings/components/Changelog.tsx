import { React } from "@webpack/common";

export default ({ changelog }: { changelog: string }) => {
    // NOTE(lexisother): Future proofing, for showing all the changelogs.
    // const CHANGELOGS = changelog
    //     .split("---changelog---\n")
    //     .slice(1)
    //     .map((changelog) => parseChangeLog(changelog));
    return <p>{changelog}</p>;
};

function parseChangeLog(changelog: string) {
    let reachedConfigEnd = false;
    const config: { [key: string]: any } = {};
    const body = changelog
        .split("\n")
        .filter((line) => {
            if (line === "---") {
                reachedConfigEnd = true;
                return false;
            }

            if (!reachedConfigEnd) {
                const params = line.split(": ");
                const key = params.shift()!;
                const value = params.join(": ");
                config[key] = JSON.parse(value);
            }

            return reachedConfigEnd;
        })
        .join("\n");
    return { ...config, body };
}
