/*
mysql> describe comments;
+------------+--------------+------+-----+---------+----------------+
| Field      | Type         | Null | Key | Default | Extra          |
+------------+--------------+------+-----+---------+----------------+
| id         | int(11)      | NO   | PRI | NULL    | auto_increment |
| song_id    | int(11)      | NO   |     | NULL    |                |
| user_id    | int(11)      | NO   |     | NULL    |                |
| track_time | varchar(8)   | YES  |     | NULL    |                |
| post_date  | datetime     | YES  |     | NULL    |                |
| comment    | varchar(512) | YES  |     | NULL    |                |
+------------+--------------+------+-----+---------+----------------+
6 rows in set (0.01 sec)

mysql> describe sub_comments;
+-------------------+--------------+------+-----+---------+----------------+
| Field             | Type         | Null | Key | Default | Extra          |
+-------------------+--------------+------+-----+---------+----------------+
| id                | int(11)      | NO   | PRI | NULL    | auto_increment |
| user_id           | int(11)      | NO   |     | NULL    |                |
| parent_comment_id | int(11)      | NO   |     | NULL    |                |
| post_date         | datetime     | YES  |     | NULL    |                |
| comment           | varchar(512) | YES  |     | NULL    |                |
+-------------------+--------------+------+-----+---------+----------------+
5 rows in set (0.00 sec)

*/

const _ = require('lodash');
const { queryPromise, formatCommentsAndSubcomments, parseUsersFromComments } = require('./helpers');
const { getCommentsAndSubcommentsQuery, getParentCommentsQuery } = require('../model/queries');

const constructCommentsWithoutJoin = (songId, limit, page) => {
  const offset = limit * page;
  return queryPromise(getParentCommentsQuery, [
    songId,
    limit,
    offset,
  ])
    .then((comments) => {
      const promises = [];
      comments.forEach((comment) => {
        promises.push(queryPromise('SELECT * FROM sub_comments WHERE parent_comment_id = ? ORDER BY post_date DESC ', [comment.id])
          .then((subComments) => {
            comment.sub_comments = subComments;
            return comment;
          })
          .catch((err) => {
            console.log('ERROR:', err);
          })
        );
      });
      return Promise.all(promises)
    })
    .catch((err) => {
      console.log('ERROR', err);
    });
};
  

module.exports = {
  constructCommentsWithoutJoin,
};


