import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { Home } from "./Home.jsx";
import "../style/login.scss";

export const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="login-logo"></div>
      <form
        id="login-form"
        className="form"
        onSubmit={(e) =>
          handleLogin(e, "manual", {
            email: document.getElementById("login-username").value,
            password: document.getElementById("login-password").value,
          })
        }
      >
        <h1>Welcome back</h1>
        <div className="form-control-login">
          <input
            type="text"
            id="login-username"
            className="form-input-login"
            placeholder="Email"
          />
        </div>
        <div className="form-control-login">
          <input
            type="password"
            id="login-password"
            className="form-input-login"
            placeholder="Password"
          />
        </div>
        <div className="form-control-login">
          <button type="submit" className="form-button">
            Log in
          </button>
        </div>
      </form>

      <div className="app_signup_google">
        <GoogleLogin
          buttonText="Login with Google"
          onSuccess={async (credResponse) => {
            var decoded = await jwt_decode(credResponse.credential);
            handleLogin(null, "google", decoded);
          }}
          onFailure={() => console.log("login failed")}
          cookiePolicy="single_host_origin"
        />
      </div>
      <div className="signup-link">
        Don't have an account yet? <Link to="/signup">Register Now</Link>
      </div>
      {/* <div>
        loginnn
        <Link to="/home">temp</Link>
      </div> */}
    </div>
  );
};
