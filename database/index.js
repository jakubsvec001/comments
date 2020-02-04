const mysql = require('mysql');
const DB_USER = process.env.DB_USER;
const DB_HOST = process.env.DB_HOST;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'bobo_beats',
  // host: DB_HOST,
  // user: DB_USER,
  // password: DB_PASS,
  // database: DB_NAME,
});

module.exports = connection;
