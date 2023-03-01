import React, { useState, useEffect } from 'react';
import profileTemp from '/src/assets/me.jpeg'

export const Bio = ({user, setGreeting, zip}) => {
  useEffect(() => {
    setGreeting(`Welcome, ${user}`)
  }, [user]);

  

  const editProfile = () => {
    console.log('editing profile...')
    //POST req stuff
  }

  return (
    <div className='bio'>
      <div className='image'>
        <img className='bioImg' src={profileTemp}></img>
      </div>
      <a onClick={editProfile} style={{margin: '-40px 0 20px 0'}} >Change Image</a>
      <div className='zipBio'>
        {zip}
      </div>
      <div className='userBio'>
        {user}
      </div>
      <button onClick={editProfile}>Edit</button>
      <button>Log Out</button>

    </div>
  )
}