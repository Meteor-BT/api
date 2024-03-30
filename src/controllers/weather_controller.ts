import type { ControllerFunc, WeatherFilterReq } from "../types";
import HttpResponse from "./http_response";
import { WeatherModel } from "../db";
import WeatherService from "../services/weather_service";

const getWeatherReport: ControllerFunc = async (req, res) => {
    try {
        const { forecast, country, city, year, month, day, hour } = (
            req as WeatherFilterReq
        ).weatherFilter;
        const s = new WeatherService(WeatherModel);
        const data = await s.getWeatherInfo(
            forecast,
            country,
            city,
            year,
            month,
            day,
            hour,
        );
        HttpResponse.ok("Weather info", data).send(res);
    } catch (err: any) {
        console.error(err.response ? err.response : err);
        HttpResponse.internal(err).send(res);
    }
};

export const weatherController = {
    getWeatherReport,
};
