import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import useFetch from '../hooks/useFetch';


export const Signup = () => {
  const { handleGoogle, loading, error } = useFetch('/signup');

  useEffect(() => {
    if (window.google) {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById(''));
    }
  })

  return (
    <div>
       <form id="signup-form" className="form" >
            <h1>Sign Up</h1>
            <div className="form-control-signup">   
                <input type="text" id="signup-username" className="form-input-signup" placeholder="Username" />              
            </div>
            <div className="form-control-signup">   
                <input type="text" id="signup-username" className="form-input-signup" placeholder="Email" />              
            </div>
            <div className="form-control-signup">             
                <input type="password" id="signup-password" className="form-input-signup" placeholder="Password" />               
            </div>
            <div className="form-control-signup">
              <button type="submit" className="form-button"  >Sign up</button>
                </div>
        </form>
    </div>
  )
}