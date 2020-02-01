import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import CommentItem from './CommentItem';
import { Spinner as SpinnerIcon } from 'styled-icons/evil'
import { Comment as CommentIcon } from 'styled-icons/boxicons-solid'

const PAGINATION_LIMIT = 10;
const TO_JOIN = false;

const makeCommentItems = (comments, userObject) => {
  return comments.map((comment) => {
    return (
      <CommentItem
        key={comment.id}
        parentComment={comment}
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
          const newComments = makeCommentItems(data.comments, usersObject);
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
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) >=
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
  }, 500, {leading: true});

  // When App mounts, fetch the page 0 of pagination and add
  // comments and users to state
  useEffect(() => {
    populateNextComments();
  }, []);

  const isLoading = () => {
    if (loading) {
      return (
        <div className='spinner-container'>
          <SpinnerIcon className='spinner'/>
        </div>
      )
    }[]
  };

  return (
    // for each grouped array of comments in state (indexed by their pagination number), create a <CommentList /> element with props
    <div className="comment-list">
      <CommentIcon className='comment-icon'/><span> {totalCommentsAvailable} comments </span>
      <hr />
      {commentArray}
      {isLoading()}
    </div>
  );
};

export default CommentApp;
