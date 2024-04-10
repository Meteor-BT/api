import { Client } from "cassandra-driver";
import dayjs from "dayjs";
import { configs } from "../configs";

export default class UsersService {
    public readonly keySpace = "user_data";

    constructor(private readonly db: Client) {}

    async addUserToWaitingList(email: string) {
        const q = `INSERT INTO ${this.keySpace}.waitlist (email, date)
                    VALUES ('${email}', '${dayjs(new Date().toUTCString()).format(configs.DATE_FORMAT)}');`;
        const res = await this.db.execute(q);
        if (res.info.warnings?.length > 0) {
            console.error(res.info.warnings);
            return res.info.warnings;
        }
        return null;
    }
}
