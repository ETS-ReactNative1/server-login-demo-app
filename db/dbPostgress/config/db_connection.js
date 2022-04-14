const { Pool, Client } = require('pg');
const { parse } = require('url');
require('dotenv').config();

//  const options = {
//   host: process.env.PG_DATABASE_HOST,
//   port : process.env.PG_DATABASE_PORT,
//   user: process.env.PG_DATABASE_USER,
//   password : process.env.PG_DATABASE_PASSWORD,
//   database: process.env.PG_DATABASE_NAME,
//   max: process.env.MAX_DB_CONNECTION || 5,
//   ssl: {
//     rejectUnauthorized: false,
//   }
// };


const pool = new Client("postgres://postgres:fbf8be56e24dc207e2954d12a036f9d0cd2735ccad7f0321@awo-eats.internal:5432");
pool.connect()
module.exports = pool;
