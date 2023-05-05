import pkg from "pg";
const { Pool } = pkg;
const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "postgres",
  password: "M1u2h3a4",
  port: 5432,
});
export default pool;
