import React, { useState } from "react";
import "../styles/dashboard.css";
import aibotIcon from "../assets/img/aibot.png";
import langIcon from "../assets/img/lang.png";

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Complete DSA assignment", done: false },
    { id: 2, text: "Watch 1 lecture on ML", done: false },
    { id: 3, text: "Solve 2 LeetCode problems", done: false },
  ]);

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  // compute progress %
const completedTasks = tasks.filter((t) => t.done).length;
const progress = (completedTasks / tasks.length) * 100;

// dynamic class based on progress
const progressClass =
  progress < 34 ? "low" : progress < 67 ? "medium" : "high";

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">EduMatch</h2>
        <nav>
          <ul>
            <li>Home</li>
            <li>Dashboard</li>
            <li>Profile</li>
            <li>Communities</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <div className="top-bar">
          <img src={langIcon} alt="Change Language" className="icon-btn" />
        </div>

        {/* Recommended Courses */}
        <h1>Recommended Courses</h1>
        <div className="course-container">
          <div className="course-card">
            <h3>Data Structures</h3>
            <p>Intermediate</p>
          </div>
          <div className="course-card">
            <h3>Machine Learning</h3>
            <p>Beginner</p>
          </div>
          <div className="course-card">
            <h3>Cybersecurity</h3>
            <p>Advanced</p>
          </div>
        </div>

        {/* Recommended Colleges */}
        <h1>Recommended Colleges</h1>
        <div className="college-container">
          <div className="college-card">
            <h3>IIT Bombay</h3>
            <p>AI & ML</p>
          </div>
          <div className="college-card">
            <h3>IIT Delhi</h3>
            <p>Cybersecurity</p>
          </div>
        </div>

        {/* Today’s Task */}
        <h1>Today's Task</h1>
        <div className="task-container">
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                  />
                  {task.text}
                </label>
              </li>
            ))}
          </ul>

          {/* Progress Bar */}
          <div className="progress-bar">
  <div
    className={`progress-fill ${progressClass}`}
    style={{ width: `${progress}%` }}
  ></div>
</div>
<p className="task-progress">
  
</p>

        
          <p>{completedTasks}/{tasks.length} tasks completed</p>
        </div>
      </main>

      {/* AI Bot Icon */}
      <img src={aibotIcon} alt="AI Bot" className="aibot-btn" />
    </div>
  );
};

export default Dashboard;
