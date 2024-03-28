import config from "./configs/env";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { createServer } from "http";
import { registerRouters } from "./routers";

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

server.listen(config.PORT, () => {
    console.log("server is listening on port: 3000");
});
