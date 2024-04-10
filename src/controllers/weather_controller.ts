import type { ControllerFunc, WeatherFilterReq } from "../types";
import HttpResponse from "./http_response";
import { dbClient } from "../db";
import WeatherService from "../services/weather_service";

const getWeatherReport: ControllerFunc = async (req, res) => {
    try {
        const s = new WeatherService(dbClient);
        const data = await s.getWeatherInfo((req as WeatherFilterReq).weatherFilter);
        HttpResponse.ok("Weather info", data).send(res);
    } catch (err: any) {
        console.error(err.response ? err.response : err);
        HttpResponse.internal(err).send(res);
    }
};

const getMergedWeatherReport: ControllerFunc = async (req, res) => {
    try {
        HttpResponse.ok("Weather report", {}).send(res);
    } catch (err: any) {
        console.error(err.response ? err.response : err);
        HttpResponse.internal(err).send(res);
    }
};

export const weatherController = {
    getWeatherReport,
    getMergedWeatherReport,
};
