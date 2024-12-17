require("dotenv").config();
const { Pool } = require("pg");

module.exports = new Pool({
    connectionString: `postgresql://${process.env.SQL_USER}:${process.env.SQL_PASSWORD}@localhost:5432/${process.env.SQL_DATABASE}`,
});
