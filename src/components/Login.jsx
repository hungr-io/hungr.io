import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";


export const Login = () => {
  const [ user, setUser ] = useState([]);
  const [ profile, setProfile ] = useState([]);
  const navigate = useNavigate();
  

  // const handleLogin = async googleData => {
  //   const res = await fetch("/api/v1/auth/google", {
  //       method: "POST",
  //       body: JSON.stringify({
  //       token: googleData.tokenId
  //     }),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //   const data = await res.json()
  //   // store returned user somehow -----> BACKENDDDDD
  // }

  document.addEventListener('submit', () => {

  });


  return (
    <div>    
      
        <form id="login-form" className="form" onSubmit>
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
          clientId={import.meta.env_VITE_GOOGLE_CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={credResponse => {
            var decoded = jwt_decode(credResponse.credential);
            console.log(decoded);
          }
          }
          onFailure={() => console.log('login failed')}
          cookiePolicy="single_host_origin"          
        />
      </div>
    </div>
  )
}

"962ceb5f2f0f5ef59a6c5b27618f73317c468603"



// render={(renderProps) => (
//   <button 
//     type="button" 
//     className="google_login_button" 
//     onClick={renderProps.onClick} 
//     disabled={renderProps.disabled}
//   >
//     <FcGoogle className="" />
//     Sign in with Google
// </button>
// )}
// onSuccess={handleLogin}
// onFailure={handleLogin}
// cookiePolicy="single_host_origin"