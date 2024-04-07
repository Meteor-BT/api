import type { Response, Request, NextFunction, RequestHandler } from "express";
export * from "./weather";

export type ControllerFunc<Req = Request, Res = Response, Next = NextFunction> = (req: Req, res: Res, next: Next) => Promise<void>;
