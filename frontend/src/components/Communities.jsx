import React, { useState } from "react";
import CommunityPost from "./CommunityPost";
import CommunityForm from "./CommunityForm";
import "./Communities.css";

const Communities = () => {
const Communities = () => {
  const [posts, setPosts] = useState([
    { id: 1, user: "Alice", content: "Just solved a tough coding problem!", date: "2025-09-14 10:00", likes: 2 },
    { id: 2, user: "Bob", content: "Participated in my first hackathon!", date: "2025-09-14 11:00", likes: 5 }
  ]);

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]); // newest first
  };

  return (
    <div className="communities">
      <h2>Community Feed</h2>
      <CommunityForm addPost={addPost} />
      <div className="posts-list">
        {posts.map((post) => (
          <CommunityPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
};
export default Communities;
