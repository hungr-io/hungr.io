import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/login.scss";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

export const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (e, loginMethod, user) => {
    setLoading(true);
    console.log(loginMethod, data);
    
    // conditional fetching: manual login or google token
    if (loginMethod === 'manual') {
      e.preventDefault();
    };

    const request = {
      method: "POST",
      body: JSON.stringify({
        "data": data,
        "loginMethod": loginMethod  
      }),
      headers: {
        "Content-Type": "application/json"
      }
    };
    // ***need to do a check to block navigation to home if error is thrown
    fetch("/api/signup", request)
      .then((res) => res.json())
      .then((resJSON) => {
        console.log('resJSON: ', resJSON);
        setUser(resJSON.name)
        setLoading(false)
        navigate('/home/find')
      })
      .catch((err) => {
        alert(err);
        // navigate('/signup');
      })

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
            handleLogin(null, 'google', credResponse.credential);}
          }
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
