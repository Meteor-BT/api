import { describe, test, expect } from "@jest/globals";
import { dbClient } from "../src/db/connection";
import type { WeatherFilter } from "../src/types";
import dayjs from "dayjs";
import { configs } from "../src/configs/env";
import WeatherService from "../src/services/weather_service";

const testData = {
    country: "Japan",
    city: "Osaka",
    tableName: "forecast_weather",
};

afterAll(async () => {
    await dbClient.shutdown();
});

describe("test query construction", () => {
    test("multiple queries for multiple days", () => {
        const filter: WeatherFilter = {
            from: dayjs("2024-04-04").format(configs.DATE_FORMAT),
            to: dayjs("2024-04-07").format(configs.DATE_FORMAT),
            country: testData.country,
            city: testData.city,
            tableName: "forecast_weather",
            limit: 5,
        };
        const s = new WeatherService(dbClient);
        const queries = s.constructGetQuery(filter);
        expect(queries.length).toEqual(4);
    });
});

describe("Getting filtered weather info", () => {
    test("get results for a specific date", async () => {
        const filter: WeatherFilter = {
            ...testData,
            from: "2024-04-06",
            to: "2024-04-06",
        };
        const s = new WeatherService(dbClient);
        const rows = await s.getWeatherInfo(filter);
        expect(rows.length).toBeGreaterThan(0);
        expect(rows[0].city_ascii).toBe("Osaka");
    });

    test("for selected week (7 days)", async () => {
        const filter: WeatherFilter = {
            ...testData,
            from: "2024-03-31",
            to: dayjs("2024-03-31").add(7, "day").format(configs.DATE_FORMAT),
        };
        const s = new WeatherService(dbClient);
        const rows = await s.getWeatherInfo(filter);
        expect(rows.length).toBeGreaterThan(6);
        expect(rows[0].city_ascii).toBe("Osaka");
    });

    test("for selected year (12 months)", async () => {});

    test("for a custom range", async () => {});
});
