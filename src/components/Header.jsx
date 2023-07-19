import React, { useState, useEffect } from 'react';
import logo from '/src/assets/logo.png';

export const Header = ({greeting}) => {
  
  return (
    <>
      <div className='header'>
        <div className='greeting'>
          {greeting}
        </div>
        <div className='logo'>
          <img src={logo} alt="LOGO" 
          width='70'
          height='70'

          />
        </div>
      </div>
    </>
  );
}