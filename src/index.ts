import { configs } from "./configs/env";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { createServer } from "http";
import { registerRouters } from "./routers";
import { dbClient, syncDbConfigs } from "./db";
import morgan from "morgan";

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
app.use(morgan("dev"));
registerRouters(app);

server.listen(configs.PORT, async () => {
    try {
        await syncDbConfigs();
        console.log("Connected to db", dbClient.getState().toString());
    } catch (err) {
        console.error("Unable to connect to the db", err);
    }
    console.log(`server is listening on port: ${configs.PORT}`);
});
