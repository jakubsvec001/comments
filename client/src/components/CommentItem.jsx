import React from 'react';
import CommentComponent from './CommentComponent';

const CommentItem = ({ parentComment, allUsers }) => {

  const makeChildComments = (parentComment) => {
    return parentComment.sub_comments.map((childComment) => {
      childComment.track_time = parentComment.track_time
      return (
        <CommentComponent data-test='comment-component-child'
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
      <CommentComponent data-test='comment-component-parent'commentObject={parentComment} allUsers={allUsers}/>
      {makeChildComments(parentComment)}
    </div>
  );
};

export default CommentItem;
