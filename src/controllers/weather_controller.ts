import type { ControllerFunc } from "../types";
import HttpResponse from "./http_response";

const getActualWeatherReport: ControllerFunc = async (req, res) => {
    try {
        HttpResponse.ok().send(res);
    } catch (err: any) {
        console.error(err.response ? err.response : err);
        HttpResponse.internal(err).send(res);
    }
};

const getWeatherForecasts: ControllerFunc = async (req, res) => {
    try {
        HttpResponse.ok().send(res);
    } catch (err: any) {
        console.error(err.response ? err.response : err);
        HttpResponse.internal(err).send(res);
    }
};

export const weatherController = {
    getActualWeatherReport,
    getWeatherForecasts,
};
