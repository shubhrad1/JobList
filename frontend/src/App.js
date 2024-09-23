import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home/Home";
import Header from "./components/parts/header/Header";
import Login from "./components/pages/Login/Login";
import SignUp from "./components/pages/SignUp/SignUp";
import Jobs from "./components/pages/Jobs/Jobs";
import LoginRecruiter from "./components/pages/LoginRecruiter/LoginRecruiter";
import SignUpRecruiter from "./components/pages/SignUpRecruiter/SignUpRecruiter";

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route
                        path="/recruiterSignIn"
                        element={<LoginRecruiter />}
                    />
                    <Route
                        path="/recruiterSignUp"
                        element={<SignUpRecruiter />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
