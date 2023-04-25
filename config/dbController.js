const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "M1u2h3a4",
  port: 5433,
});
export default pool;
