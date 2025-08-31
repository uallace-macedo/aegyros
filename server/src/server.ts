import envValues from "./shared/utils/get-env-values.ts";
import app from "./app.ts";

const $PORT = envValues.SERVER_PORT;
app.listen($PORT, () => {
  console.log(`[server] running as http://localhost:${$PORT}`);
});