const getCommentsAndSubcommentsQuery = `
SELECT 
  c.id as commentId,
  c.song_id as songId,
  c.user_id as userId,
  c.track_time as trackTime,
  c.post_date as postDate,
  c.comment as comment,
  GROUP_CONCAT(sc.id ORDER BY sc.post_date DESC separator '>---!---<') as subCommentIds,
  GROUP_CONCAT(sc.user_id ORDER BY sc.post_date DESC separator '>---!---<') as subUserIds,
  GROUP_CONCAT(sc.parent_comment_id ORDER BY sc.post_date DESC separator '>---!---<') as parentCommentIds,
  GROUP_CONCAT(sc.post_date ORDER BY sc.post_date DESC separator '>---!---<') as subCommentPostDates,
  GROUP_CONCAT(sc.comment ORDER BY sc.post_date DESC separator '>---!---<') as subCommentComments
FROM comments c
  JOIN sub_comments sc
    ON (c.id = sc.parent_comment_id)
WHERE c.song_id = ?
GROUP BY c.id
ORDER BY c.post_date DESC
LIMIT ? OFFSET ?;
`;

const getUsersQuery = 'SELECT * FROM users WHERE id in (?)';

const getParentCommentsQuery = 'SELECT * FROM comments WHERE song_id = ? ORDER BY post_date DESC LIMIT ? OFFSET ?';

module.exports = {
  getCommentsAndSubcommentsQuery,
  getUsersQuery,
  getParentCommentsQuery,
};
