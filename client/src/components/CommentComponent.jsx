import React, { useState } from 'react';
import TimeAgo from 'react-timeago';
import { Reply } from 'styled-icons/remix-fill';

const formatter = (value, unit, suffix) => {
  if (+value > 1) unit = unit + 's'; 
  return `${value} ${unit} ago`
}

const CommentComponent = ({ commentObject, allUsers, child}) => {

  
  const { user_id, track_time, post_date, comment } = commentObject;
  const { username, follower_count, avatar_url } = allUsers[user_id];


  const [ hovered, setHovered ] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  return (
    <div className={child || 'parent'}>
      <div className='comment-container' onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
        <img className="avatar pointer-cursor" src={avatar_url} />
        <div className="user-data pointer-cursor">
          <span className="user-name">{username}</span><span className='at'> at </span>
          <span className="track-time"> {track_time}</span>
        </div>
        <div className="comment">{comment}</div>
        <TimeAgo className="timeago" date={post_date} formatter={formatter}/>
        {hovered && <div className="reply-btn pointer-cursor" ><Reply className="reply-icon"/> Reply</div>}
      </div>
    </div>
  );
};

export default CommentComponent;
