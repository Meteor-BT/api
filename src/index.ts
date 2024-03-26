import express from "express";
import helmet from "helmet";
import cors from "cors";
import { createServer } from "http";

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

server.listen(3000, () => {
    console.log("server is listening on port: 3000");
});
