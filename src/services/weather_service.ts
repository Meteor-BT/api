import type { WeatherFilter, WeatherInfo } from "../types";
import { Client } from "cassandra-driver";
import dayjs from "dayjs";
import { configs } from "../configs";
import cassandra from "cassandra-driver";
import { keySpaces, tableNames } from "../db/configs";

export default class WeatherService {
    constructor(private readonly db: Client) {}

    constructGetQuery(filter: WeatherFilter) {
        const queries: string[] = [];

        function createQuery(qlist: string[], f: WeatherFilter) {
            let q = `SELECT * FROM ${keySpaces.WEATHER}.${f.tableName}`;
            q += `\nWHERE date = '${dayjs(f.from).format(configs.DATE_FORMAT)}'`;
            q += `\nAND city_ascii = '${f.city}'`;
            q += `\nAND country = '${f.country}'`;
            if (f.limit) {
                q += `\nLIMIT '${f.limit}'`;
            }
            q += "\nALLOW FILTERING;";
            qlist.push(q);
        }

        if (dayjs(filter.from).isSame(filter.to, "day")) {
            createQuery(queries, filter);
        } else {
            let now = dayjs(filter.from);
            do {
                const from = now.format(configs.DATE_FORMAT);
                now = now.add(1, "day");
                createQuery(queries, { ...filter, from });
            } while (!now.isAfter(filter.to, "day"));
        }

        return queries;
    }

    async getCombinedInfo(filter: WeatherFilter) {
        const queries = this.constructGetQuery({ ...filter, tableName: tableNames.WEATHER.COMBINED });
        const promises: Promise<cassandra.types.ResultSet>[] = [];
        queries.forEach((q) => {
            promises.push(this.db.execute(q));
        });
        const results = await Promise.allSettled(promises);
        const rows: cassandra.types.Row[] = [];
        results.forEach((r) => {
            if (r.status === "fulfilled") {
                rows.push(...r.value.rows);
            } else {
                console.error(r.reason);
            }
        });
        const data: WeatherInfo[] = [];
        for (let i = 0; i < rows.length; i++) {
            const r = rows[i];
            data.push({
                city_ascii: r.get("city_ascii"),
                country: r.get("country"),
                temperature_2m: r.get("temperature_2m"),
                pressure_msl: r.get("pressure_msl"),
                windspeed_10m: r.get("windspeed_10m"),
                relativehumidity_2m: r.get("relativehumidity_2m"),
                date: new Date(r.get("date")),
                lat: r.get("lat"),
                lon: r.get("lon"),
                forecast: r.get("data_type") !== "actual",
            });
        }
        return data;
    }

    async getForecastInfo(filter: WeatherFilter) {
        const queries = this.constructGetQuery({ ...filter, tableName: tableNames.WEATHER.FORECAST });
        const promises: Promise<cassandra.types.ResultSet>[] = [];
        queries.forEach((q) => {
            promises.push(this.db.execute(q));
        });
        const results = await Promise.allSettled(promises);
        const rows: cassandra.types.Row[] = [];
        results.forEach((r) => {
            if (r.status === "fulfilled") {
                rows.push(...r.value.rows);
            } else {
                console.error(r.reason);
            }
        });
        const data: WeatherInfo[] = [];
        for (let i = 0; i < rows.length; i++) {
            const r = rows[i];
            data.push({
                city_ascii: r.get("city_ascii"),
                country: r.get("country"),
                temperature_2m: r.get("temperature_2m"),
                pressure_msl: r.get("pressure_msl"),
                windspeed_10m: r.get("windspeed_10m"),
                relativehumidity_2m: r.get("relativehumidity_2m"),
                date: new Date(r.get("date")),
                lat: r.get("lat"),
                lon: r.get("lon"),
                forecast: true,
            });
        }
        return data;
    }

    async getActualInfo(filter: WeatherFilter) {
        const queries = this.constructGetQuery({ ...filter, tableName: tableNames.WEATHER.ACTUAL });
        const promises: Promise<cassandra.types.ResultSet>[] = [];
        queries.forEach((q) => {
            promises.push(this.db.execute(q));
        });
        const results = await Promise.allSettled(promises);
        const rows: cassandra.types.Row[] = [];
        results.forEach((r) => {
            if (r.status === "fulfilled") {
                rows.push(...r.value.rows);
            } else {
                console.error(r.reason);
            }
        });
        const data: WeatherInfo[] = [];
        for (let i = 0; i < rows.length; i++) {
            const r = rows[i];
            data.push({
                city_ascii: r.get("city_ascii"),
                country: r.get("country"),
                temperature_2m: r.get("temperature_2m"),
                pressure_msl: r.get("pressure_msl"),
                windspeed_10m: r.get("windspeed_10m"),
                relativehumidity_2m: r.get("relativehumidity_2m"),
                date: new Date(r.get("date")),
                lat: r.get("lat"),
                lon: r.get("lon"),
                forecast: false,
            });
        }
        return data;
    }

    async getWeatherInfo(filter: WeatherFilter) {
        const results = await Promise.allSettled([this.getCombinedInfo(filter), this.getForecastInfo(filter), this.getActualInfo(filter)]);
        const data: WeatherInfo[] = [];
        for (const r of results) {
            if (r.status === "fulfilled") {
                data.push(...r.value);
            } else {
                console.error(r.reason);
            }
        }

        if (data.length === 1 && dayjs(filter.from).isSame(filter.to, "day")) {
            const ref = data[0];
            data.splice(0, data.length);
            const from = dayjs(filter.from).startOf("day");
            let n = from.startOf("day");
            do {
                data.push({ ...ref, date: n.toDate() });
                n = n.add(1, "hour");
            } while (from.isSame(n, "day"));
        }

        return data;
    }
}
