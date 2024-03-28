import { Client } from "cassandra-driver";
import configs from "../configs/env";

export async function connectToDb() {
    const c = new Client({
        contactPoints: [configs.DB_HOST],
        localDataCenter: configs.DB_DATA_CENTER,
        keyspace: configs.DB_KEYSPACE,
    });

    return c;
}
