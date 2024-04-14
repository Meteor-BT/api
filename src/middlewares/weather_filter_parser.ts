import type { ControllerFunc, WeatherFilter, WeatherFilterReq } from "../types";
import HttpResponse from "../controllers/http_response";
import dayjs from "dayjs";
import { configs } from "../configs";

export const weatherFilterParser: ControllerFunc = async (req, res, next) => {
    let country = req.query.country;
    let city = req.query.city;
    let from = req.query.from;
    let to = req.query.to;
    const weatherFilter: WeatherFilter = {} as WeatherFilter;

    if (typeof city !== "string" || typeof country !== "string") {
        HttpResponse.unprocessableEntity("Please provide the City and Country info.").send(res);
        return;
    }
    weatherFilter.country = country;
    weatherFilter.city = city;

    if (typeof from !== "string" || !from) {
        weatherFilter.from = dayjs(Date.now()).format(configs.DATE_FORMAT);
        weatherFilter.to = dayjs(Date.now()).format(configs.DATE_FORMAT);
    } else {
        weatherFilter.from = dayjs(from).format(configs.DATE_FORMAT);
        weatherFilter.to = dayjs(to && typeof to === "string" ? to : from).format(configs.DATE_FORMAT);
    }
    {
        // temporarily using this date range, will be removed in a future update.
        weatherFilter.from = dayjs("2024-03-01").format(configs.DATE_FORMAT);
        weatherFilter.to = dayjs(Date.now()).format(configs.DATE_FORMAT);
    }

    (req as WeatherFilterReq).weatherFilter = weatherFilter;
    next();
};
