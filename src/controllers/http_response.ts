import type { Response } from "express";
import { parseError } from "../utils";

export default class HttpResponse {
    status = 400;
    success = false;
    message = "Bad Request";
    data: any = {};
    code?: string;

    constructor(
        status: number,
        success: boolean,
        message: string,
        data: any,
        code?: string,
    ) {
        this.status = status;
        this.success = success;
        this.message = parseError(message);
        this.data = data;
        this.code = code;
    }

    /**
     * Creates an Ok response.
     */
    static ok(message = "Ok", data = {}) {
        const custom = new HttpResponse(200, true, message, data);
        return custom;
    }

    /**
     * Creates a created response.
     */
    static created(message = "Created", data = {}) {
        const custom = new HttpResponse(201, true, message, data);
        return custom;
    }

    /**
     * Creates an Not found response.
     */
    static notFound(message = "Not found", data = {}) {
        const custom = new HttpResponse(404, false, message, data);
        return custom;
    }

    /**
     * Creates a bad request response.
     */
    static badRequest(
        message = "Bad request",
        data = {},
        code = "BAD_REQUEST_ERROR",
    ) {
        const custom = new HttpResponse(400, false, message, data, code);
        return custom;
    }

    /**
     * Creates a forbidden response.
     */
    static forbidden(
        message = "Forbidden",
        data = {},
        code = "FORBIDDEN_ERROR",
    ) {
        const custom = new HttpResponse(403, false, message, data, code);
        return custom;
    }

    /**
     * Creates an unauthorized response.
     */
    static unauthorized(message = "Unauthorized", data = {}) {
        const custom = new HttpResponse(401, false, message, data);
        return custom;
    }

    /**
     * Creates an internal error response.
     */
    static internal(message = "Internal error", data = {}) {
        const custom = new HttpResponse(500, false, message, data);
        return custom;
    }

    /**
     * create a service unavailable error
     */
    static unavailable(message = "Service Unavailable", data = {}) {
        const custom = new HttpResponse(503, false, message, data);
        return custom;
    }

    /**
     * create and send payment required http error response
     */
    static paymentRequired(message = "Payment Required", data = {}) {
        const custom = new HttpResponse(402, false, message, data);
        return custom;
    }

    /**
     * Send HTTP response.
     * @param {import("express").Response} res
     */
    send(res: Response) {
        const resBody = {
            statusCode: this.status,
            success: this.success,
            message: this.message,
            data: this.data,
        };
        res.status(this.status).json(resBody);
    }

    /**
     * Get the response body.
     */
    get body() {
        const resBody = {
            statusCode: this.status,
            success: this.success,
            message: this.message,
            code: this.code,
            data: this.data,
        };
        return resBody;
    }
}
