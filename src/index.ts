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

  try {
    await sequelize.sync();
    logger.info(`[database]: All models were synchronized successfully.`);
  } catch (error) {
    logger.error("[database]: Database synchronizes fail:", error);
  }
})();

// listen to requests
app.listen(port, () =>
  logger.info(`[server]: Server is running on ${port} (${env})`)
);

export default app;
