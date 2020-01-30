const { queryPromise } = require('./helpers');

// get totalCount of parent comments:
const getTotalCommentCountForSong = (songId) => {
  return queryPromise('SELECT COUNT(*) as total FROM comments WHERE song_id = ?', [
    songId,
  ])
  .then((response) => response[0].total);
};

module.exports = {
  getTotalCommentCountForSong,
};
