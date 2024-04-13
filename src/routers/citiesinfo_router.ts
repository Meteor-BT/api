import { Router } from "express";
import fs from "fs";
import HttpResponse from "../controllers/http_response";

export const citiesinfoRouter = Router();

citiesinfoRouter.get("/citiesinfo/all", (req, res) => {
    const data = fs.readFileSync("./src/assets/citieslist.json").toString();
    HttpResponse.ok("All the cities info", JSON.parse(data)).send(res);
});
