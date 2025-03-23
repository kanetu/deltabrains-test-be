import { version, name } from "../../../package.json";
import { port } from "../../config/vars";

const swaggerDef = {
  openapi: "3.0.0",
  info: {
    title: `${name} API documentation`,
    version,
    license: {
      name: "MIT",
    },
  },
  servers: [
    {
      url: `http://localhost:${port}/v1`,
    },
  ],
};

export default swaggerDef;
