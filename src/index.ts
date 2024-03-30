import config from "./configs/env";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { createServer } from "http";
import { registerRouters } from "./routers";
import { dbClient } from "./db";

const app = express();
const server = createServer(app);

app.use(
    helmet({
        strictTransportSecurity: true,
    }),
);
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
registerRouters(app);

server.listen(config.PORT, async () => {
    console.log(`server is listening on port: ${config.PORT}`);
    // for testing the connection at app startup. Should replace in the future with something like: `SELECT * FROM ping LIMIT 1;`
    await dbClient.execute("SELECT * FROM actual_weather LIMIT 1;");
    console.log("Connected to db", dbClient.getState().toString());
});
