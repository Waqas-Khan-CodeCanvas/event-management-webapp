//  env variable validation
require("dotenv").config()
const requiredEnvVars = ["NODE_ENV", "PORT", "MONGO_URI"];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Missing required environment variable : ${key}`);
    process.exit(1);
  }
});

module.exports = {
    nodeEnv:process.env.NODE_ENV,
    port: Number(process.env.PORT),
    mongoUri:process.env.MONGO_URI,
};
