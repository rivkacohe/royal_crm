//open connection to the DB
const mysql =require('mysql2');
const config = require("../config/dev");

//connection pool stats
const pool = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

async function query(sql, values) {
  const promisePool = pool.promise();
  return [rows, fields] = await promisePool.query(sql, values);
}ent.db(config.MONGO_DB);

   

module.exports = {
  query,
};
