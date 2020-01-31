import React, { useState } from 'react';
import TimeAgo from 'react-timeago';
import ChildComment from './ChildComment';
import { Reply } from 'styled-icons/remix-fill';

const formatter = (value, unit, suffix) => {
  if (+value > 1) unit = unit + 's'; 
  return `${value} ${unit} ago`
}

const ParentComment = ({ parentComment, allUsers }) => {
  
  const { user_id, track_time, post_date, comment } = parentComment;
  const { username, follower_count, avatar_url } = allUsers[user_id]

  const [ hovered, setHovered ] = useState(false);
  const toggleHover = () => setHovered(!hovered);
  
  const makeChildComments = (parentComment) => {
    return parentComment.sub_comments.map((childComment) => {
      return (
        <ChildComment
          key={childComment.id}
          parentTrackTime={track_time}
          childComment={childComment}
          allUsers={allUsers}
        />
      );
    });
  };
  return (
    <div>
      <div className='parent-comment comment-container' onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
        <img className="avatar" src={avatar_url} />
        <div className="user-data">
          <span className="user-name">{username}</span><span className='at'> at </span>
          <span className="track-time"> {track_time}</span>
        </div>
        <div className="comment">{comment}</div>
        <TimeAgo className="timeago" date={post_date} formatter={formatter}/>
        {hovered && <div className="reply-btn" ><Reply className="reply-icon"/> Reply</div>}
      </div>
      {makeChildComments(parentComment)}
    </div>
  );
};

export default ParentComment;
