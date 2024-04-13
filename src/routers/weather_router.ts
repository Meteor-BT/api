import { Router } from "express";
import { weatherController } from "../controllers";
import { weatherFilterParser } from "../middlewares";

export const weatherRouter = Router();

weatherRouter.get("/weather/combined", weatherFilterParser, weatherController.getWeatherReport);
