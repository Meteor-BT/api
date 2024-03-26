import { Router } from "express";
import { weatherController } from "../controllers";

export const weatherRouter = Router();

weatherRouter.get("/weather/actuals", weatherController.getActualWeatherReport);
weatherRouter.get("/weather/forecasts", weatherController.getWeatherForecasts);
