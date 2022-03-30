const { Pool } = require('pg');
const { parse } = require('url');
require('dotenv').config();

 const options = {
  host: process.env.PG_DATABASE_HOST,
  port : process.env.PG_DATABASE_PORT,
  user: process.env.PG_DATABASE_USER,
  password : process.env.PG_DATABASE_PASSWORD,
  database: process.env.PG_DATABASE_NAME,
  max: process.env.MAX_DB_CONNECTION || 5,
  ssl: {
    rejectUnauthorized: false,
  }
};


const pool = new Pool(options);
module.exports = pool;
