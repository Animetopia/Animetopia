import React, { useState } from 'react'
import './stylesheets/App.css'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import HomePage from './components/HomePage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AnimePage from './components/AnimePage'

function App() {
  // const [count, setCount] = useState(0)
  const [userId, setUserId] = useState("");
    return (
      <Router>
        <div className = "App">
          <Routes>
            <Route exact path="/" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/animePage" element={<AnimePage/>}/>
          </Routes>
        </div>
      </Router>
    );
  }

export default App