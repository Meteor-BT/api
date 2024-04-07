import { config } from "dotenv";

const NODE_ENV = process.env.NODE_ENV || "development";
if (NODE_ENV !== "production") {
    const result = config({ path: ".dev.env" });
    if (result.error) {
        console.error(result.error);
        process.exit(1);
    }
}
const DATE_FORMAT = "YYYY-MM-DD";
const DATETIME_FORMAT = "YYYY-MM-DD HH[:00:00.0000]";

export const configs = {
    NODE_ENV,
    DATE_FORMAT,
    DATETIME_FORMAT,
    PORT: process.env.PORT as string,
    DB_HOST: process.env.DB_HOST as string,
    DB_DATA_CENTER: process.env.DB_DATA_CENTER as string,
    DB_KEYSPACE: process.env.DB_KEYSPACE as string,
};

if (!configs.PORT) {
    console.error("PORT is required to run the app");
    process.exit(1);
}
if (!configs.DB_HOST) {
    console.error("DB_HOST is required to run the app");
    process.exit(1);
}
if (!configs.DB_DATA_CENTER) {
    console.error("DB_DATA_CENTER is required to run the app");
    process.exit(1);
}
if (!configs.DB_KEYSPACE) {
    console.error("DB_KEYSPACE is required to run the app");
    process.exit(1);
}
