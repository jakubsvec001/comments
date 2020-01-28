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
const conn = require('../../database/');
const { getCommentsAndSubcomments } = require('../model/queries')

const queryPromise = (queryString, queryOptions) => {
  return new Promise((resolve, reject) => {
    conn.query(queryString, queryOptions, (err, response, fields) => {
      if (err) reject(err);
      else {
        resolve(response, fields);
      }
    });
  });
};

const formatCommentsAndSubcomments = (comment) => {
  const parsed = {
    subCommentIds: comment.subCommentIds.split('>---!---<'),
    subUserIds: comment.subUserIds.split('>---!---<'),
    parentCommentIds: comment.parentCommentIds.split('>---!---<'),
    subCommentPostDates: comment.subCommentPostDates.split('>---!---<'),
    subCommentComments: comment.subCommentComments.split('>---!---<'),
  };
  const subCommentArrays = _.zip(
    parsed.subCommentIds,
    parsed.subUserIds,
    parsed.subCommentPostDates,
    parsed.subCommentComments,
  );
  const subCommentsObjectsArray = subCommentArrays.map((subComment) => {
    return {
      commentId: subComment[0],
      userId: subComment[1],
      postDate: subComment[2],
      comment: subComment[3],
    };
  });
  const final = {
    commentId: comment.commentId,
    songId: comment.songId,
    userId: comment.userId,
    trackTime: comment.trackTime,
    postDate: comment.postDate,
    comment: comment.comment,
    subComments: subCommentsObjectsArray,
  };
  return final;
};

const constructComments = (songId, limit = 10, page = 0) => {
  /*
  SELECT c.id, c.song_id, c.user_id, GROUP_CONCAT(sc.comment) FROM comments c
    JOIN sub_comments sc
      ON (c.id = sc.parent_comment_id)
      WHERE c.id = 2
  GROUP BY c.id
  ORDER BY c.post_date;
  */

  const offset = limit * page;

  queryPromise(getCommentsAndSubcomments, [songId.toString(), limit, offset])
    .then((response) => {
      // format the input
      const commentsArray = [];
      response.forEach((comment) => {
        commentsArray.push(formatCommentsAndSubcomments(comment));
      });
      return commentsArray;
    })
    .then((commentsArray) => {
      // save the input as state here
      console.log(commentsArray);
    })
    .catch((err) => {
      console.log(err);
    });
};

constructComments(9, 3, 1);

module.exports = {
  constructComments,
};
