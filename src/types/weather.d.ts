import { Request } from "express";

export type WeatherInfo = {
    city_ascii: string;
    country: string;
    temperature_2m: number;
    pressure_msl: number;
    windspeed_10m: number;
    relativehumidity_2m: number;
    date: Date;
    lat: number;
    lon: number;
    forecast: boolean;
};

export type WeatherFilter = {
    from: string;
    to: string;
    country: string;
    city: string;
    tableName: string;
    limit?: number;
};

export interface WeatherFilterReq extends Request {
    weatherFilter: WeatherFilter;
}
