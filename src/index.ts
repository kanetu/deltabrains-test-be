import { port, env } from "./config/vars";
import logger from "./config/logger";
import app from "./config/express";
import sequelize from "./config/sequelize";

(async () => {
  try {
    await sequelize.authenticate();
    logger.info(`[database]: Connection has been established successfully.`);
  } catch (error) {
    logger.error("[database]: Unable to connect to the database:", error);
  }
})();

// listen to requests
app.listen(port, () =>
  logger.info(`[server]: Server is running on ${port} (${env})`)
);

export default app;
