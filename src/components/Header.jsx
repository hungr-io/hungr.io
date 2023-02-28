import React, { useState, useEffect } from 'react';

export const Header = ({greeting}) => {
  
  return (
    <>
      <div className='header'>
        <div className='greeting'>
          {greeting}
        </div>
        <div className='logo'>
          LOGO
        </div>
      </div>
    </>
  );
}