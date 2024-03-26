import { config } from "dotenv";

export function prepareEnvs() {
    const NODE_ENV = process.env.NODE_ENV;
    if (NODE_ENV === "production") {
        return;
    }

    const result = config({ path: ".dev.env" });
    console.log(result);
}
