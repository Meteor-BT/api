"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const globals_1 = require("@jest/globals");
require("../src/configs/env");
const connection_1 = require("../src/db/connection");
const tableName = "actual_weather";
(0, globals_1.describe)("Database connection test", () => {
    (0, globals_1.test)("testing query execution", () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const q = `SELECT * FROM ${tableName} LIMIT 1;`;
        const res = yield connection_1.dbClient.execute(q);
        console.log(res.rows);
        expect(res.rows.length).toBe(1);
    }));
    afterAll(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        yield connection_1.dbClient.shutdown();
    }));
});
