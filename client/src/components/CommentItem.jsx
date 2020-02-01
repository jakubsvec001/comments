import React from 'react';
import CommentComponent from './CommentComponent';

const CommentItem = ({ parentComment, allUsers }) => {
  console.log(parentComment)

  const makeChildComments = (parentComment) => {
    return parentComment.sub_comments.map((childComment) => {
      childComment.track_time = parentComment.track_time
      return (
        <CommentComponent
          key={childComment.id}
          commentObject={childComment}
          allUsers={allUsers}
          child="child"
        />
      );
    });
  };

  return (
    <div>
      <CommentComponent commentObject={parentComment} allUsers={allUsers}/>
      {makeChildComments(parentComment)}
    </div>
  );
};

export default CommentItem;
