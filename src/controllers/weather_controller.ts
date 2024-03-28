import type { ControllerFunc } from "../types";
import HttpResponse from "./http_response";
import { WeatherModel } from "../db";
import WeatherService from "../services/weather_service";

const getActualWeatherReport: ControllerFunc = async (req, res) => {
    const country = req.body.country,
        city = req.body.city,
        year = req.body.year,
        month = req.body.month,
        day = req.body.day,
        hour = req.body.hour;

    if (
        !country ||
        !city ||
        typeof country !== "string" ||
        typeof city !== "string"
    ) {
        HttpResponse.badRequest(
            "Payload is invalid, please specify the country and city",
        ).send(res);
        return;
    }

    try {
        const s = new WeatherService(WeatherModel);
        const data = s.getWeatherInfo(
            false,
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

const getWeatherForecasts: ControllerFunc = async (req, res) => {
    const country = req.body.country,
        city = req.body.city,
        year = req.body.year,
        month = req.body.month,
        day = req.body.day,
        hour = req.body.hour;

    if (
        !country ||
        !city ||
        typeof country !== "string" ||
        typeof city !== "string"
    ) {
        HttpResponse.badRequest(
            "Payload is invalid, please specify the country and city",
        ).send(res);
        return;
    }

    try {
        const s = new WeatherService(WeatherModel);
        const data = s.getWeatherInfo(
            true,
            country,
            city,
            year,
            month,
            day,
            hour,
        );
        HttpResponse.ok("Weather forecast", data).send(res);
    } catch (err: any) {
        console.error(err.response ? err.response : err);
        HttpResponse.internal(err).send(res);
    }
};

export const weatherController = {
    getActualWeatherReport,
    getWeatherForecasts,
};
