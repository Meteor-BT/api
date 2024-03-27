import { config } from "dotenv";

export function prepareEnvs() {
    const NODE_ENV = process.env.NODE_ENV;
    if (NODE_ENV !== "production") {
        const result = config({ path: ".dev.env" });
        if (result.error) {
            console.error(result.error);
            process.exit(1);
        }
    }

    const { PORT } = process.env;

    if (!PORT) {
        console.error("PORT is required to run the app");
        process.exit(1);
    }
}
