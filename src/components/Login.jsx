import React, { useState, useEffect, useHistory } from 'react';
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { Home } from './Home.jsx'


export const Login = (props) => {
  const { user, setUser, selectedPage, setSelectedPage } = props;
  const [ profile, setProfile ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState("");
  const navigate = useNavigate();
  

  const handleLogin = async (e, loginMethod, data) => {
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
    fetch("/api/login", request)
      .then((res) => res.json())
      .then((resJSON) => {
        console.log('resJSON: ', resJSON);
        setUser(resJSON.name)
        setLoading(false)
        navigate('/home')
      })
      .catch((err) => {
        console.log(err);
        // navigate('/signup');
      })
    
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
            handleLogin(null, 'google', credResponse.credential);}
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





