import { config as conf } from "dotenv";

conf();

const _config = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGODB_URL,
  env: process.env.NODE_ENV,
  name: process.env.NAME,
};
export const config = Object.freeze(_config);
