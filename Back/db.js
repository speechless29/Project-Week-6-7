const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "student_db",
  password: "Opopop291209@",
  port: 5432,
});

module.exports = pool;
