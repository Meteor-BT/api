import type { ControllerFunc } from "../types";
import HttpResponse from "./http_response";
import UsersService from "../services/users_service";
import { dbClient } from "../db";

const joinWaitlist: ControllerFunc = async (req, res) => {
    try {
        const email = req.body.email;
        if (!email) {
            HttpResponse.unprocessableEntity("'email' is missing from the request payload").send(res);
            return;
        }
        const s = new UsersService(dbClient);
        let err = await s.addUserToWaitingList(email);
        if (err) {
            HttpResponse.badRequest(err.join(", ")).send(res);
            return;
        }
        HttpResponse.ok("Successfully joined the wait list.").send(res);
    } catch (err: any) {
        HttpResponse.badRequest(err).send(res);
    }
};

export const usersController = {
    joinWaitlist,
};
