//open connection to the DB
const { MongoClinet } = require("mongodb");
const config = require("../config/dev");

//connection pool stats
const client = new MongoClinet(config,MONGO_DB);
let db = undefined;

async function getDb(){
  if (db) return db;
  await client.connect();
  return client.db(config.MONGO_DB);
}
   

module.exports = {
  getDb,
};
