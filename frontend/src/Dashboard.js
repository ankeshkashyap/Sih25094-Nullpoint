import React from "react";

export default function Dashboard({ profile, logout }) {
  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 30 }}>
      <h2>Welcome to Dashboard, {profile.fullName}</h2>

      <p>Here are some AI-driven personalized recommendations (placeholder):</p>

      {/* You can reuse your Recommendations component here */}

      <button onClick={logout} style={{ marginTop: 20 }}>
        Logout
      </button>
    </div>
  );
}
