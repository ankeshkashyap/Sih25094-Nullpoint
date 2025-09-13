import React from "react";

const CommunityPost = ({ post }) => {
  return (
    <div className="post-card">
      <div className="post-header">
        <h4>{post.user}</h4>
        <span>{post.date}</span>
      </div>
      <p>{post.content}</p>
      <div className="post-actions">
        <button>Like ({post.likes})</button>
        <button>Comment</button>
      </div>
    </div>
  );
};

export default CommunityPost;
