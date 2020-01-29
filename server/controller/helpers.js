const _ = require('lodash')
const conn = require('../../database');

// a promisifier function around connection.query function
const queryPromise = (queryString, queryOptions) => {
  return new Promise((resolve, reject) => {
    conn.query(queryString, queryOptions, (err, response, fields) => {
      if (err) reject(err);
      else {
        resolve(response, fields);
      }
    });
  })
};

// a helper function to parse all the comments and subcomments into a nested json object
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
    parsed.parentCommentIds,
    parsed.subCommentPostDates,
    parsed.subCommentComments,
  );
  const subCommentsObjectsArray = subCommentArrays.map((subComment) => ({
    id: +subComment[0],
    user_id: +subComment[1],
    parent_comment_id: +subComment[2],
    post_date: subComment[3],
    comment: subComment[4],
  }));
  const final = {
    id: comment.commentId,
    song_id: comment.songId,
    user_id: comment.userId,
    track_time: comment.trackTime,
    post_date: comment.postDate,
    comment: comment.comment,
    sub_comments: subCommentsObjectsArray,
  };
  return final;
};

const parseUsersFromComments = (comments) => {
  const users = new Set();
  const traverseComments = (nodes) => {
    nodes.forEach((node) => {
      users.add(node.user_id);
      if (node.sub_comments) {
        traverseComments(node.sub_comments);
      }
    });
  };
  traverseComments(comments);
  return Array.from(users);
};


module.exports = {
  queryPromise,
  formatCommentsAndSubcomments,
  parseUsersFromComments,
};
