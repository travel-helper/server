require("dotenv").config();
const env = process.env;

const development = {
  username: env.DB_USER,
  password: env.DB_PASS,
  database: "Travel",
  host: env.DB_HOST,
  dialect: "mysql",
};

const production = {
  username: env.DB_USER,
  password: env.DB_PASS,
  database: "Travel",
  host: env.DB_HOST,
  dialect: "mysql",
};

const test = {
  username: env.DB_USER,
  password: env.DB_PASS,
  database: "test",
  host: env.DB_HOST,
  dialect: "mysql",
};

module.exports = { development, production, test };
