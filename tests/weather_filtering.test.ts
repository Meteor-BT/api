import { describe, test, beforeAll, expect } from "@jest/globals";
import { dbClient } from "../src/db/connection";

const testData = {};

beforeAll(async () => {
    await dbClient.execute("SELECT * FROM actual_weather LIMIT 1;");
}, 10_000);
afterAll(async () => {
    await dbClient.shutdown();
});

describe("Getting filtered weather info", () => {
    test("for selected date (24 hours)", async () => {});

    test("for selected month (31|30|29|28 days)", async () => {});

    test("for selected week (7 days)", async () => {});

    test("for selected year (12 months)", async () => {});

    test("for a custom range", async () => {});
});
