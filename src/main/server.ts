import app from "./config/app";
import typeorm from "./database/database-connection";
import { RedisConnection } from "./database/redis-connection";

typeorm
  .initialize()
  .then(() => {
    RedisConnection.connect()
    app.listen(8080, () => console.log("Api running on http://localhost:8080"));
  })
  .catch((err) => {
    console.error(err);
  });
