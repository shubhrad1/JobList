import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home/Home";
import Header from "./components/parts/header/Header";
import Login from "./components/pages/Login/Login";
import SignUp from "./components/pages/SignUp/SignUp";
import Jobs from "./components/pages/Jobs/Jobs";
import Profile from "./components/pages/Profile/Profile";
import LoginRecruiter from "./components/pages/LoginRecruiter/LoginRecruiter";
import SignUpRecruiter from "./components/pages/SignUpRecruiter/SignUpRecruiter";
import PostJobs from "./components/pages/PostJobs/PostJobs";
import ViewApplication from "./components/pages/Application/ViewApplication";
import ViewApplicationR from "./components/pages/Application/ViewApplicationRecruiter";

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
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/postJobs" element={<PostJobs />} />
                    <Route
                        path="/myApplications"
                        element={<ViewApplication />}
                    />
                    <Route
                        path="/recruiterApplications"
                        element={<ViewApplicationR />}
                    />
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
