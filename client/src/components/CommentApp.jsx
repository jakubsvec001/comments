import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import CommentItem from './CommentItem';
import { Spinner } from 'styled-icons/evil';
import { Comment } from 'styled-icons/boxicons-solid';
import styled, { keyframes } from 'styled-components';

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
        <SpinnerContainer>
          <SpinnerIcon className='spinner'/>
        </SpinnerContainer>
      )
    }[]
  };

  const CommentList = styled.div`
    align-self: center;
    margin: 0;
    color: #999999;
    max-width: 659px;
    min-width: 600px;
    font-size: 12px; 
    box-sizing: border-box;
    font-family: "InterstateSound Tnum", Interstate, "Lucida Grande", "Lucida Sans Unicode","Lucida Sans",Garuda,Verdana,Tahoma,sans-serif;
  `
  const CommentIcon = styled(Comment)`
    display: inline;
    height: 1.2em;
  `
  
  const LoadingKeyFrames = keyframes`
    0% { transform: rotate(0deg); };
    8% { transform: rotate(30deg); }
    16% { transform: rotate(60deg); }
    25% { transform: rotate(90deg); }
    33% { transform: rotate(120deg); }
    41% { transform: rotate(150deg); }
    50% { transform: rotate(180deg); }
    58% { transform: rotate(210deg); }
    66% { transform: rotate(240deg); }
    75% { transform: rotate(270deg); }
    88% { transform: rotate(300deg); }
    91% { transform: rotate(330deg); }
    100% { transform: rotate(360deg); }
  `

  const SpinnerIcon = styled(Spinner)`
    display: block;
    margin: auto;
    height: 80px;
    width:  80px;
    animation: ${LoadingKeyFrames} .75s infinite step-end;
  `

  const SpinnerContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 300px;
  `
  
  return (
    // for each grouped array of comments in state (indexed by their pagination number), create a <CommentList /> element with props
    <CommentList className="comment-list">
      <CommentIcon className='comment-icon'/><span> {totalCommentsAvailable} comments </span>
      <hr />
      {commentArray}
      {isLoading()}
    </CommentList>
  );
};

export default CommentApp;
