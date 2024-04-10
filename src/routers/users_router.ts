import { Router } from "express";
import { usersController } from "../controllers";

export const usersRouter = Router();

usersRouter.post("/users/join-waitlist", usersController.joinWaitlist);
