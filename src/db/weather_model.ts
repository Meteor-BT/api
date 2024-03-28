import type { WeatherInfo } from "../types";
import { dbClient } from "./index";
import cassandra from "cassandra-driver";

export const WeatherModel = new cassandra.mapping.Mapper(dbClient, {
    models: {
        Forecast: {
            tables: ["forecasts"],
            mappings: new cassandra.mapping.DefaultTableMappings(),
            // columns: {},
        },
    },
}).forModel<WeatherInfo>("Forecast");
