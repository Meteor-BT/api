import { Client } from "cassandra-driver";
import { configs } from "../configs/env";
import fs from "fs";

console.log(`conneting to: ${configs.DB_HOST} | ${configs.DB_DATA_CENTER}`);
export const dbClient = new Client({
    contactPoints: [configs.DB_HOST],
    localDataCenter: configs.DB_DATA_CENTER,
});

export async function syncDbConfigs() {
    const filesToSync = ["./cql/user.cql", "./cql/weather.cql"];

    for (const f of filesToSync) {
        if (!fs.existsSync(f)) continue;

        const str = fs.readFileSync(f).toString();
        if (str.includes("--")) {
            throw new Error("Please do not include '--' comments in the .cql file.");
        }
        const queries = str.split(";").map((q) => q.trim() + ";");
        for (let i = 0; i < queries.length - 1; i++) {
            const q = queries[i];
            const res = await dbClient.execute(q);
            if (res.info.warnings?.length > 0) {
                throw new Error(res.info.warnings.join("\n"));
            }
        }
    }
}
