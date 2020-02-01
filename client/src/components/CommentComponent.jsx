import React, { useState } from 'react';
import TimeAgo from 'react-timeago';
import { Reply } from 'styled-icons/remix-fill';
import styled from 'styled-components';

const formatter = (value, unit, suffix) => {
  if (+value > 1) unit = unit + 's'; 
  return `${value} ${unit} ago`
}

const CommentComponent = ({ commentObject, allUsers, child}) => {

  
  const { user_id, track_time, post_date, comment } = commentObject;
  const { username, follower_count, avatar_url } = allUsers[user_id];


  const [ hovered, setHovered ] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  //Styles
  const CommentDiv = styled.div`
    margin-left: ${child && "2em"};
  `
  const Avatar = styled.img`
    border: 1px #999999 solid;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    grid-area: avatar;
    cursor: pointer;
  `
  const CommentContainer = styled.div`
    padding-bottom: 2em;
    display: grid;
    grid-template-columns: 40px 1fr 90px;
    grid-template-rows: 1.6em auto;
    grid-template-areas: 
    "avatar data timeago"
    "avatar comment reply";
    justify-content: stretch;
  `
  const ReplyBtn = styled.div`
    border: 1px #f2f2f2 solid;
    justify-self: end;
    align-self: flex-end;
    height: 20px;
    width: 50px;
    max-width: 70px;
    border-radius: 4px;
    grid-area: reply;
    padding: .3em .62em .1em .62em;
    cursor: pointer;
    :hover {
      border: 1px #999999 solid;
    }
  `
  const CommentText = styled.div`
    grid-area: comment;
    color: #333;
    margin-left: 1em;
  `
  const AtSpan = styled.span`
    color: #ccc;
  `
  const UserDataDiv = styled.div`
    margin-left: 1em;
    grid-area: data;
  `
  const ReplyIcon = styled(Reply)`
    height: 1.2em;
  `
  const TimeAgoStyled = styled(TimeAgo)`
    text-align: end;
    grid-area: timeago;
    font-size: 11px;
  `
  // <-- Styles

  return (
    <CommentDiv>
      <CommentContainer onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
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
