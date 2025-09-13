import React, { useState } from "react";

const CommunityForm = ({ addPost }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content) return;
    addPost({
      id: Date.now(),
      user: "You", // later can fetch actual user
      content,
      date: new Date().toLocaleString(),
      likes: 0
    });
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your experience..."
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default CommunityForm;
