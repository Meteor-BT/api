import type { Response, Request, NextFunction } from "express";
export * from "./weather";

export type ControllerFunc = (
    req: Request,
    res: Response,
    next: NextFunction,
) => Promise<void>;
