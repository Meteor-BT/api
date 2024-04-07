import { Client } from "cassandra-driver";
import { configs } from "../configs/env";

console.log(`conneting to: ${configs.DB_HOST} | ${configs.DB_DATA_CENTER} | ${configs.DB_KEYSPACE}`);
export const dbClient = new Client({
    contactPoints: [configs.DB_HOST],
    localDataCenter: configs.DB_DATA_CENTER,
    keyspace: configs.DB_KEYSPACE,
});
