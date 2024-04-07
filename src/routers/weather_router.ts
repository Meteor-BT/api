import { Router } from "express";
import { weatherController } from "../controllers";
import { weatherFilterParser } from "../middlewares";

export const weatherRouter = Router();

weatherRouter.get("/weather/actuals", weatherFilterParser, weatherController.getWeatherReport);
weatherRouter.get("/weather/forecasts", weatherFilterParser, weatherController.getWeatherReport);
