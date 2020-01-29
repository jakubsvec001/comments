import React from 'react';
import TimeAgo from 'react-timeago';
import ChildComment from './ChildComment';


const formatter = (value, unit, suffix) => {
  if (+value > 1) unit = unit + 's'; 
  return `${value} ${unit} ago`
}

const ParentComment = ({ parentComment, allUsers }) => {

  
  const { user_id, track_time, post_date, comment } = parentComment;
  const { username, follower_count, avatar_url } = allUsers[user_id]

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
      <div>
        <img className="avatar" src={avatar_url} />
        <div className="user-name">{username}</div>
        <div className="track-time">{track_time}</div>
        <div className="comment">{comment}</div>
        <TimeAgo date={post_date} formatter={formatter}/>
        <div className="reply-btn">REPLY</div>
      </div>
      {makeChildComments(parentComment)}
    </div>
  );
};

export default ParentComment;
