import "dotenv/config";

const envsConfig = {
  DATABASE_URL: process.env.DATABASE_URL,
  SECRET_TOKEN: process.env.SECRET_TOKEN,
  EXPIRE_IN: process.env.EXPIRE_IN,
  REDIS_URL: process.env.REDIS_URL,
};

export default envsConfig;
