import type { ControllerFunc, WeatherFilter, WeatherFilterReq } from "../types";
import HttpResponse from "../controllers/http_response";
import dayjs from "dayjs";
import { configs } from "../configs";

const tableNames = {
    actual: "actual_weather",
    forecast: "forecast_weather",
};

export const weatherFilterParser: ControllerFunc = async (req, res, next) => {
    let country = req.query.country;
    let city = req.query.city;
    let from = req.query.from;
    let to = req.query.to;
    const weatherFilter: WeatherFilter = {} as WeatherFilter;

    if (typeof city !== "string" || typeof country !== "string") {
        HttpResponse.unprocessableEntity("Either provice `city` & `country` or `lat` & `lon`").send(res);
        return;
    }

    weatherFilter.country = country;
    weatherFilter.city = city;

    if (typeof from !== "string") {
        weatherFilter.from = dayjs(Date.now()).format(configs.DATE_FORMAT);
        weatherFilter.to = dayjs(Date.now()).format(configs.DATE_FORMAT);
    } else {
        weatherFilter.from = dayjs(from).format(configs.DATE_FORMAT);
        weatherFilter.to = dayjs(typeof to === "string" ? to : from).format(configs.DATE_FORMAT);
    }

    if (req.url.includes("forecasts")) {
        weatherFilter.tableName = tableNames.forecast;
    } else {
        weatherFilter.tableName = tableNames.actual;
    }

    (req as WeatherFilterReq).weatherFilter = weatherFilter;
    console.log("handling req:", weatherFilter);
    next();
};
