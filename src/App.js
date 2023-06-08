import React, { useState } from "react";
import "./stylesheets/App.css";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import HomePage from "./components/HomePage";
import SearchResult from "./components/SearchResult";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfilePage from "./components/ProfilePage";
import AnimePage from "./components/AnimePage";

function App() {
  const [userId, setUserId] = useState("");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LoginPage setUserId={setUserId}/>} />
          <Route
            path="/signup"
            element={<SignupPage setUserId={setUserId} />}
          />
          <Route path="/home" element={<HomePage userId={userId}/>} />
          <Route path="/search-results" element={<SearchResult />} />
          <Route path="/animePage" element={<AnimePage />} />
          <Route path="/profile" element={<ProfilePage userId={userId}/>} />
          {/* <Route path="/" element={<ProfilePage userId={userId}/>} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
