import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TutorSignupForm from "./TutorSignupForm.jsx";


import StudentSignupForm from "./StudentSignupForm.jsx";
import SigninForm from "./SigninForm.jsx";
import { useAuth } from "../contexts/AuthProvider.jsx";

const Login = () => {
  const [signupType, setSignupType] = useState("STUDENT");

  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (token) navigate('/student/home')
  }, [token])

  return (
    <div
      class="d-flex justify-content-center align-items-start"
      style={{ gap: "3rem" }}>
      <div class="card" style={{ width: "40%" }}>
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
              <Link
                class={`nav-link ${signupType === "STUDENT" ? "active" : ""}`}
                to="#/student"
                onClick={() => setSignupType("STUDENT")}>
                Student
              </Link>
            </li>
            <li class="nav-item">
              <Link
                class={`nav-link ${signupType === "TUTOR" ? "active" : ""}`}
                to="#/tutor"
                onClick={() => setSignupType("TUTOR")}>
                Tutor
              </Link>
            </li>
          </ul>
        </div>

        <div class="card-body">
          <h3 class="card-title">Sign Up</h3>
          <p class="text-body-secondary">
            Enter your details below to create your account and get started.
          </p>
          {signupType === "STUDENT" && <StudentSignupForm />}
          {signupType === "TUTOR" && <TutorSignupForm />}
        </div>
      </div>
      <div class="card" style={{ width: "30%" }}>
        <div class="card-body">
          <h3 class="card-title text-center">Welcome back</h3>
          <p class="text-body-secondary text-center">
            Glad to see you again! Login to your account below.
          </p>
          <SigninForm />
        </div>
      </div>
    </div>
  );
}

export default Login;