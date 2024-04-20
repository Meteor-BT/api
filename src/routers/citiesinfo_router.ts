import { Router } from "express";
import { citieslist } from "../assets";
import HttpResponse from "../controllers/http_response";

export const citiesinfoRouter = Router();

citiesinfoRouter.get("/citiesinfo/all", (req, res) => {
    HttpResponse.ok("All the cities info", citieslist).send(res);
});
