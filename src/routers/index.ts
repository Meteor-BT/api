import type { Express } from "express";
import { weatherRouter } from "./weather_router";
import { healthRouter } from "./health_router";

export function registerRouters(app: Express) {
    app.use("/api/v1", weatherRouter, healthRouter);
}
