import React, { useState } from 'react';
import styled from 'styled-components';
import {
  TimeAgoStyled,
  ReplyIcon,
  UserDataDiv,
  CommentText,
  ReplyBtn,
  CommentContainer,
  Avatar,
  AtSpan,
} from './styles/CommentComponentStyled';

const formatter = (value, unit, suffix) => {
  if (+value > 1) unit = unit + 's';
  return `${value} ${unit} ago`;
};

const CommentComponent = ({ commentObject, allUsers, child }) => {
  const { user_id, track_time, post_date, comment } = commentObject;
  const { username, follower_count, avatar_url } = allUsers[user_id];

  const [hovered, setHovered] = useState(false);
  const isHover = () => setHovered(true);
  const isNotHover = () => setHovered(false);

  const ChildContainer = styled.div`
    margin-left: ${child && '2em'};
  `;

  return (
    <ChildContainer data-test="comment-div">
      <CommentContainer
        data-test="comment-container"
        onMouseEnter={isHover}
        onMouseLeave={isNotHover}>
        <Avatar data-test="avatar" src={avatar_url} />
        <UserDataDiv data-test="user-data-div">
          <span>{username}</span>
          <AtSpan> at </AtSpan>
          <span> {track_time}</span>
        </UserDataDiv>
        <CommentText data-test="comment-text">{comment}</CommentText>
        <TimeAgoStyled
          data-test="time-ago-styled"
          date={post_date}
          formatter={formatter}
        />
        {hovered && (
          <ReplyBtn data-test="reply-btn">
            <ReplyIcon /> Reply
          </ReplyBtn>
        )}
      </CommentContainer>
    </ChildContainer>
  );
};

export default CommentComponent;
