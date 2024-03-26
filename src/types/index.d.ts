import type { Response, Request, NextFunction } from "express";

export type ControllerFunc = (
    req: Request,
    res: Response,
    next: NextFunction,
) => Promise<void>;
