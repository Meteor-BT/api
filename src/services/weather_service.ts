import type { WeatherFilter } from "../types";
import { Client } from "cassandra-driver";

export default class WeatherService {
    constructor(private readonly db: Client) {}

    async getWeatherInfo(filter: WeatherFilter) {
        let q = `SELECT * FROM ${filter.tableName}`;
        q += `WHERE country = ${filter.country}
                AND city = ${filter.city}
                AND date >= ${filter.from}
                AND date <= ${filter.to}`;
        if (filter.limit && Number.isInteger(filter.limit)) {
            q += `\nLIMIT ${filter.limit}`;
        }
        q += "\nALLOW FILTERING;";
        const res = await this.db.execute(q);
        console.log(res.rowLength);
        return res.rows;
    }
}
