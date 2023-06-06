import React, { useState } from 'react'
import './stylesheets/App.css'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  // const [count, setCount] = useState(0)
    return (
      <Router>
        <div className = "App">
          <Routes>
            <Route exact path="/" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
          </Routes>
        </div>
      </Router>
    );
  }

export default App