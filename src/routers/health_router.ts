import { Router } from "express";
import HttpResponse from "../controllers/http_response";

export const healthRouter = Router();

healthRouter.all("/health", (req, res) => {
    HttpResponse.ok("API is doing fine.", { message: req.body.message }).send(res);
});
