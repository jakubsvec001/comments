import React from 'react';
import ParentComment from './ParentComment';


const CommentList = ({commentGroup, allUsers}) => {
  const makeParentComments = (commentGroup) => {
    return commentGroup.map((parentComment) => {
      return <ParentComment key={parentComment.id} parentComment={parentComment} allUsers={allUsers} />
    })
  };

  return (
    <div>
      {makeParentComments(commentGroup)}
    </div>
  )
};

export default CommentList;