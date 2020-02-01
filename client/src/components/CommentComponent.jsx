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
  return `${value} ${unit} ago`
}


const CommentComponent = ({ commentObject, allUsers, child}) => {
  
  const { user_id, track_time, post_date, comment } = commentObject;
  const { username, follower_count, avatar_url } = allUsers[user_id];
  
  const [ hovered, setHovered ] = useState(false);
  const isHover = () => setHovered(true);
  const isNotHover = () => setHovered(false);
  
  const CommentDiv =styled.div`
  margin-left: ${child && "2em"};
  `

  return (
    <CommentDiv>
      <CommentContainer onMouseEnter={isHover} onMouseLeave={isNotHover}>
        <Avatar src={avatar_url} />
        <UserDataDiv>
          <span >{username}</span><AtSpan> at </AtSpan>
          <span> {track_time}</span>
        </UserDataDiv>
        <CommentText>{comment}</CommentText>
        <TimeAgoStyled date={post_date} formatter={formatter}/>
        {hovered && <ReplyBtn><ReplyIcon/> Reply</ReplyBtn>}
      </CommentContainer>
    </CommentDiv>
  );
};

export default CommentComponent;
