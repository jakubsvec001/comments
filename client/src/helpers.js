import React from 'react';
import ParentComment from './components/ParentComment';

const makeParentComments = (commentGroup, userObject) => {
  return commentGroup.map((parentComment) => {
    return (
      <ParentComment
        key={parentComment.id}
        parentComment={parentComment}
        allUsers={userObject}
      />
    );
  });
};

const populateNextComments = (
  songId,
  PAGINATION_LIMIT,
  TO_JOIN,
  commentArray,
  setCommentArray,
  nextPagination,
  setNextPagination,
  setTotalCommentsAvailable,
  firstLoad,
  setFirstLoad,
  commentsRemaining,
  setCommentsRemaining,
  setUsers,
  setLoading) => {
    console.log(setLoading)
  setLoading(true);
  fetch(
    `http://localhost:3000/api/songs/${songId}?page=${nextPagination}&limit=${PAGINATION_LIMIT}&join=${TO_JOIN}`,
    {
      method: 'GET',
      mode: 'cors',
    },
  )
    .then((stream) => stream.json())
    .then((data) => {
      if (firstLoad) {
        setTotalCommentsAvailable(data.totalCount);
        setCommentsRemaining(data.totalCount - data.comments.length);
        setFirstLoad(false);
      } else {
        setCommentsRemaining(commentsRemaining - data.comments.length);
      }
      setNextPagination(nextPagination + 1);
      const usersObject = {};
      data.users.forEach((user) => {
        usersObject[user.id] = user;
      });
      setUsers(() => {
        return usersObject;
      });
      setCommentArray(() => {
        const newComments = makeParentComments(data.comments, usersObject);
        setTimeout(() => {
          setLoading(false);
        }, 200);
        return [...commentArray, ...newComments];
      });
    })
    .catch((err) => console.log(err));
};

export { populateNextComments };
