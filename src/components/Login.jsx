import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { Home } from './Home.jsx'


export const Login = () => {
  const [ user, setUser ] = useState([]);
  const [ profile, setProfile ] = useState([]);
  const navigate = useNavigate();
  

  const handleLogin = async (e, loginMethod, data) => {
    let emailValue, passwordValue;
    
    // conditional fetching: manual login or google token
    if (loginMethod === 'manual') {
      e.preventDefault();
      emailValue = data.email;
      passwordValue = data.password
    };

    if (loginMethod === 'google') {
      emailValue = data.email;
      passwordValue = data.sub
    }

    console.log('emails: ', emailValue);
    console.log('passwords: ', passwordValue);

    try {
      const res = await fetch("/login", {
        method: "POST",
        body: JSON.stringify({
          "email": emailValue,
          "password": passwordValue  
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const resJSON = await res.json();
      console.log('resJSON: ', resJSON);
    } catch (err) { alert(err) }
    
  }



  return (
    <div>    
      
        <form id="login-form" className="form" onSubmit={(e) => handleLogin(e, 'manual', { 'email': document.getElementById("login-username").value, 'password': document.getElementById("login-password").value})}>
            <h1>Welcome back</h1>
            <div className="form-control-login">   
                <input type="text" id="login-username" className="form-input-login" placeholder="Email" />              
            </div>
            <div className="form-control-login">             
                <input type="password" id="login-password" className="form-input-login" placeholder="Password" />               
            </div>
            <div className="form-control-signin">
              <button type="submit" className="form-button" >Log in</button>
                </div>
        </form>

        <div>
          Don't have an account yet? <Link to='/signup'>Register Now</Link>
        </div>
      
      <div className="app_signup_google">
        <GoogleLogin 
          buttonText="Login with Google"
          onSuccess={async (credResponse) => {
            var decoded = await jwt_decode(credResponse.credential);
            handleLogin(null, 'google', decoded);}
          }
          onFailure={() => console.log('login failed')}
          cookiePolicy="single_host_origin"          
        />
      </div>
    <div>loginnn
      <Link to='/home'>temp</Link>
    </div>
  </div>
  )
}





