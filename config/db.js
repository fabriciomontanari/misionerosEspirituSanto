const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres.innyxdqzurkbjwwouzib", 
  host: "aws-0-us-east-1.pooler.supabase.com", 
  database: "postgres",
  password: "MisionerosES!", 
  port: 6543, 
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;
