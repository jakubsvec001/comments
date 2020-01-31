import React, { useState } from 'react';
import TimeAgo from 'react-timeago';
import { Reply } from 'styled-icons/remix-fill';

const formatter = (value, unit, suffix) => {
  if (+value > 1) unit = unit + 's'; 
  return `${value} ${unit} ago`
}

const ChildComment = ({childComment, parentTrackTime, allUsers}) => {
  const { user_id, post_date, comment } = childComment;
  const { username, follower_count, avatar_url } = allUsers[user_id]

  const [ hovered, setHovered ] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  return (
    <div className="child-comment comment-container" onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
      <img className="avatar" src={avatar_url} />
      <div className="user-data">
          <span className="user-name">{username}</span><span className='at'> at </span>
          <span className="track-time"> {parentTrackTime}</span>
        </div>
      <div className="comment">{comment}</div>
      <TimeAgo className='timeago' date={post_date} formatter={formatter}/>
      {hovered && <div className="reply-btn" ><Reply className="reply-icon"/> Reply</div>}
    </div>
  )
};

export default ChildComment;
