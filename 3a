import type { ControllerFunc, WeatherFilterReq } from "../types";
import HttpResponse from "../controllers/http_response";

export const weatherFilterParser: ControllerFunc = async (req, res, next) => {
    const country = req.query.country;
    const city = req.query.city;
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDay();
    let hour = undefined;

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

    if (req.query.year && typeof req.query.year === "string") {
        const n = parseInt(req.query.year);
        if (Number.isInteger(n) && !Number.isNaN(n)) {
            year = n;
        }
    }
    if (req.query.month && typeof req.query.month === "string") {
        const n = parseInt(req.query.month);
        if (Number.isInteger(n) && !Number.isNaN(n)) {
            month = n;
        }
    }
    if (req.query.day && typeof req.query.day === "string") {
        const n = parseInt(req.query.day);
        if (Number.isInteger(n) && !Number.isNaN(n)) {
            day = n;
        }
    }
    if (req.query.hour && typeof req.query.hour === "string") {
        const n = parseInt(req.query.hour);
        if (Number.isInteger(n) && !Number.isNaN(n)) {
            hour = n;
        }
    }
    (req as WeatherFilterReq).weatherFilter = {
        country,
        city,
        year,
        month,
        day,
        hour,
        forecast: req.url.endsWith("forecasts"),
    };
    next();
};
