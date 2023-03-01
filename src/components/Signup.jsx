import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/login.scss";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

export const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (e, loginMethod, user) => {
    if (loginMethod === "manual") {
      e.preventDefault();
      createUser();
      navigate("/home");
    } else {
      console.log("this is my data: ", user);
      const isExist = verifyUser();
      if (isExist) {
        navigate("/home");
      } else {
        createUser();
      }
    }

    const createUser = async () => {
      try {
        const res = await fetch("/api/signup", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    const verifyUser = async () => {
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
  };
  return (
    <div className="signup-page">
      <form
        id="login-form"
        className="form"
        onSubmit={(e) =>
          handleSignup(e, "manual", {
            email: document.getElementById("login-username").value,
            password: document.getElementById("login-password").value,
          })
        }
      >
        <h1>Sign Up</h1>
        <div className="form-control-login">
          <input
            type="text"
            id="signup-username"
            className="form-input-signup"
            placeholder="Username"
          />
        </div>
        <div className="form-control-login">
          <input
            type="text"
            id="signup-username"
            className="form-input-signup"
            placeholder="Email"
          />
        </div>
        <div className="form-control-login">
          <input
            type="password"
            id="signup-password"
            className="form-input-signup"
            placeholder="Password"
          />
        </div>
        <div className="form-control-signup">
          <button type="submit" className="form-button">
            Sign up
          </button>
        </div>
      </form>
      <div className="app_signup_google">
        <GoogleLogin
          buttonText="Register with Google"
          onSuccess={async (credResponse) => {
            var decoded = await jwt_decode(credResponse.credential);
            handleSignup(null, "google", {
              email: decoded.email,
              password: decoded.password,
            });
          }}
          onFailure={() => console.log("login failed")}
          cookiePolicy="single_host_origin"
        />
      </div>
      <div className="signup-link">
        Already have login and password? <Link to="/">Log in here</Link>
      </div>
    </div>
  );
};
