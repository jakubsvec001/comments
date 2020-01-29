/*

mysql> describe users;
+----------------+--------------+------+-----+---------+----------------+
| Field          | Type         | Null | Key | Default | Extra          |
+----------------+--------------+------+-----+---------+----------------+
| id             | int(11)      | NO   | PRI | NULL    | auto_increment |
| username       | varchar(64)  | NO   |     | NULL    |                |
| avatar_url     | varchar(128) | NO   |     | NULL    |                |
| follower_count | int(11)      | YES  |     | NULL    |                |
+----------------+--------------+------+-----+---------+----------------+
4 rows in set (0.00 sec)

*/

const _ = require('lodash');
const { queryPromise } = require('./helpers');
const { getUsersQuery } = require('../model/queries');


const constructUsers = (array) => {
  let arr = array;
  if (!Array.isArray(arr) && typeof arr === 'number') {
    arr = [arr];
  }
  return queryPromise(getUsersQuery, [array]);
};

module.exports = {
  constructUsers,
};
