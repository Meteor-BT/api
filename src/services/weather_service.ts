import type { WeatherFilter } from "../types";
import { Client } from "cassandra-driver";
import dayjs from "dayjs";
import { configs } from "../configs";
import cassandra from "cassandra-driver";

export default class WeatherService {
    public readonly keySpace = "weather_data";

    constructor(private readonly db: Client) {}

    constructGetQuery(filter: WeatherFilter) {
        const queries: string[] = [];
        const ks = this.keySpace;

        function createQuery(f: WeatherFilter) {
            let q = `SELECT * FROM ${ks}.${f.tableName}`;
            q += `\nWHERE date = '${dayjs(f.from).format(configs.DATE_FORMAT)}'`;
            q += `\nAND city_ascii = '${f.city}'`;
            if (f.country) {
                q += `\nAND country = '${f.country}'`;
            }
            if (f.limit) {
                q += `\nLIMIT '${f.limit}'`;
            }
            q += "\nALLOW FILTERING;"; // WARN: we should optimize our db by adding `city_ascii` & `country` as primary/secondary indexes.
            return q;
        }

        if (dayjs(filter.from).isSame(filter.to, "date")) {
            queries.push(createQuery(filter));
        } else {
            let now = dayjs(filter.from);
            do {
                const from = now.format(configs.DATE_FORMAT);
                now = now.add(1, "day");
                queries.push(createQuery({ ...filter, from }));
            } while (!now.isAfter(filter.to, "day"));
        }

        return queries;
    }

    async getMergedResults() {}

    async getWeatherInfo(filter: WeatherFilter) {
        const queries = this.constructGetQuery(filter);
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
                console.log(r.reason);
            }
        });
        return rows;
    }
}
