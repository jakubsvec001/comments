import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import ParentComment from './ParentComment';

const PAGINATION_LIMIT = 2;

const CommentApp = ({ songId }) => {
  const [commentArray, setCommentArray] = useState([]);
  const [nextPagination, setNextPagination] = useState(0);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(false);

  const makeParentComments = (commentGroup, userObject) => {
    return commentGroup.map((parentComment) => {
      return <ParentComment key={parentComment.id} parentComment={parentComment} allUsers={userObject} />
    })
  };

  const populateNextComments = () => {
    setLoading(true);
    fetch(
      `http://localhost:3000/api/songs/${songId}?page=${nextPagination}&limit=${PAGINATION_LIMIT}&join=true`,
      {
        method: 'GET',
        mode: 'cors',
      },
    )
      .then((stream) => stream.json())
      .then((data) => {
        const usersObject = {};
        data.users.forEach((user) => {
          usersObject[user.id] = user;
        });
        setUsers(() => {
          return usersObject;
        });
        setCommentArray(() => {
          setNextPagination(nextPagination + 1);
          setLoading(false);
          const newComments = makeParentComments(data.comments, usersObject);
          return [...commentArray, ...newComments];
        });
      });
  }

  window.onscroll = debounce(() => {
    // if already loading, exit
    if (!isLoading) return;
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) ===
      document.documentElement.offsetHeight
    ) {
      console.log('loading next')
      populateNextComments();
    }
  }, 25);

  // When App mounts, fetch the page 0 of pagination and add
  // comments and users to state

  useEffect(() => {
    populateNextComments()
  }, []);

  const isLoading = () => {
    if (loading) {
      return <h3>LOADING...</h3>;
    }
  };

  return (
    // for each grouped array of comments in state (indexed by their pagination number), create a <CommentList /> element with props
    <div>
      <p>xx,xxx comments</p>
      {(() => {
        if (commentArray.length === nextPagination * PAGINATION_LIMIT) {
          return commentArray;
        }
      })()}
      {isLoading()}
    </div>
  );
};

export default CommentApp;
