import type { Express } from "express";
import { weatherRouter } from "./weather_router";
import { healthRouter } from "./health_router";
import { usersRouter } from "./users_router";
import { citiesinfoRouter } from "./citiesinfo_router";

export function registerRouters(app: Express) {
    app.use("/api/v1", weatherRouter, healthRouter, usersRouter, citiesinfoRouter);
}
