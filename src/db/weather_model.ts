import type { WeatherInfo } from "../types";
import { dbClient } from "./index";
import cassandra from "cassandra-driver";

export const WeatherModel = new cassandra.mapping.Mapper(dbClient, {
    models: {
        Forecast: {
            tables: ["forecasts"],
            keyspace: "weather_data",
            mappings: new cassandra.mapping.DefaultTableMappings(),
            columns: {
                id: "id",
                date: "date",
                city_ascii: "city_ascii",
                country: "country",
                day: "day",
                lat: "lat",
                lon: "lon",
                month: "month",
                pressure_msl: "pressure_msl",
                relativehumidity_2m: "relativehumidity_2m",
                run_id: "run_id",
                temperature_2m: "temperature_2m",
                windspeed_10m: "windspeed_10m",
                year: "year",
            },
        },
    },
}).forModel<WeatherInfo>("Forecast");
