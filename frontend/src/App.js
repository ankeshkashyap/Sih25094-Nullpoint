import React from "react";
import Login from "./Login";
import Dashboard from "./pages/dashboard"; 
import "./styles/dashboard.css"; 

function App() {
  return (
    <div className="App">
      <Login />
      <Dashboard />
    </div>
  );
}

export default App;
