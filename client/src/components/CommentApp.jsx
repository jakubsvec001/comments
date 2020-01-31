import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import ParentComment from './ParentComment';

const PAGINATION_LIMIT = 10;
const TO_JOIN = false;

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

const CommentApp = ({ songId }) => {
  const [commentArray, setCommentArray] = useState([]);
  const [nextPagination, setNextPagination] = useState(0);
  const [totalCommentsAvailable, setTotalCommentsAvailable] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);
  const [commentsRemaining, setCommentsRemaining] = useState(0);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(false);

  const populateNextComments = () => {
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
        console.log(data)
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

  window.onscroll = debounce(() => {
    // if already loading, exit

    if (loading) {
      console.log('already loading');
      return;
    }
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) <=
      document.documentElement.offsetHeight
    ) {
      console.log(commentsRemaining);
      if (commentsRemaining > 0) {
        console.log('loading next');
        populateNextComments();
      } else {
        console.log('Comments left: ', commentsRemaining);
      }
    }
  }, 500);

  
  // When App mounts, fetch the page 0 of pagination and add
  // comments and users to state
  useEffect(() => {
    populateNextComments();
  }, []);

  const isLoading = () => {
    if (loading) {
      return <h3>LOADING...</h3>;
    }
  };

  return (
    // for each grouped array of comments in state (indexed by their pagination number), create a <CommentList /> element with props
    <div className="comment-list">
      <p>{totalCommentsAvailable} comments</p>
      <hr />
      {(() => {
        return commentArray;
      })()}
      {isLoading()}
    </div>
  );
};

export default CommentApp;
