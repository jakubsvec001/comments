import styled from 'styled-components';
import TimeAgo from 'react-timeago';
import { Reply } from 'styled-icons/remix-fill';

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

export {
  TimeAgoStyled,
  ReplyIcon,
  UserDataDiv,
  CommentText,
  ReplyBtn,
  CommentContainer,
  Avatar,
  AtSpan,
}