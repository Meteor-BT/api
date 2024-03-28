import type { Client } from "cassandra-driver";
import type { WeatherInfo } from "../types";

export class WeatherModel implements WeatherInfo {
    constructor(
        public id: string,
        public date: Date,
        public run_id: string,
        public city_ascii: string,
        public country: string,
        public temperature_2m: number,
        public pressure_msl: number,
        public windspeed_10m: number,
        public relativehumidity_2m: number,
        public forecast: boolean,
    ) {}
}
