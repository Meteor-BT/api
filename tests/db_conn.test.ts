import { describe, test } from "@jest/globals";
import "../src/configs/env";
import { dbClient } from "../src/db/connection";

const tableName = "actual_weather";

describe("Database connection test", () => {
    test("testing query execution", async () => {
        const q = `SELECT * FROM ${tableName} LIMIT 1;`;
        const res = await dbClient.execute(q);
        console.log(res.rows);
        expect(res.rows.length).toBe(1);
    });

    afterAll(async () => {
        await dbClient.shutdown();
    });
});
