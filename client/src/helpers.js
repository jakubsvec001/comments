import React from 'react';
import CommentItem from './components/CommentItem';

/**
 * Creates React Components <CommentItem /> to be placed in CommentApp Component state 
 * @param {array} comments- comments retrieved from server
 * @param {object} userObject - users retrieved from server
 * @return {array} - an array of <CommentItem /> components
 */
const makeCommentItems = (comments, userObject) => {
  return comments.map((comment) => {
    return (
      <CommentItem data-test='comment-item'
        key={comment.id}
        parentComment={comment}
        allUsers={userObject}
      />
    );
  });
};

/**
 * A PROMISE that resolves with data served by the backend
 * @param {integer} songId - selects the song the server will use in its database query
 * @param {integer} nextPagination - used to offset the results from the server's database query
 * @param {integer} PAGINATION_LIMIT - used to limit the results from the server's database query 
 */
const fetchPagination = (songId, nextPagination, PAGINATION_LIMIT) => fetch(
  `http://localhost:3000/api/songs/${songId}?page=${nextPagination}&limit=${PAGINATION_LIMIT}&join=false`,
  {
    method: 'GET',
    mode: 'cors',
  },
)

export { fetchPagination, makeCommentItems };
