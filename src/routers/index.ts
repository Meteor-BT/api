import type { Express, Request, Response, NextFunction } from "express";
import { weatherRouter } from "./weather_router";
import { healthRouter } from "./health_router";
import { usersRouter } from "./users_router";
import { citiesinfoRouter } from "./citiesinfo_router";
import HttpResponse from "../controllers/http_response";
import { parseError } from "../utils";

export function registerRouters(app: Express) {
    app.use("/api/v1", weatherRouter, healthRouter, usersRouter, citiesinfoRouter);

    app.use("/api/v1/expect-error", (req, res, next) => {
        next(new Error("This error was expected."));
    });

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        if (!err) {
            return next();
        }
        const errMsg = parseError(err);
        HttpResponse.internal(`Error during the request processing - ${errMsg}`).send(res);
    });

    app.use("*", (req, res) => {
        HttpResponse.notFound(`No matching path/method found - ${req.method}: ${req.baseUrl}`).send(res);
    });
}
