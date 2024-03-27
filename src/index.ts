import express from "express";
import helmet from "helmet";
import cors from "cors";
import { createServer } from "http";
import { registerRouters } from "./routers";
import { prepareEnvs } from "./configs";

prepareEnvs();

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

server.listen(3000, () => {
    console.log("server is listening on port: 3000");
});
