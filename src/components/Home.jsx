import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom'; 
import { Navbar } from './Navbar.jsx';
import { Header } from './Header.jsx';
import { Find } from './Find.jsx';
import { Bio } from './Bio.jsx';
import { Likes } from './Likes.jsx';

export const Home = ({selectedPage, user}) => {
  const [greeting, setGreeting] = useState(`Welcome,  ${user}`);
  const [btnColor, setBtnColor] = useState('none');
  const [zipcode, setZipcode] = useState('00000');
  
  // const [selectedPage, setSelectedPage] = useState('');
  // const [user, setUser] = useState('user');
  const navigate = useNavigate();

  return (
    <>
      <Header greeting={greeting} user={user} />
      <div>
        <Routes>
          <Route path='/bio' element={ <Bio setBtnColor={setBtnColor} setGreeting={setGreeting} user={user} zipcode={zipcode}/> } />
          <Route path='/likes' element={ <Likes setBtnColor={setBtnColor} setGreeting={setGreeting} user={user}/> } />
          <Route path='/find' element={ <Find setBtnColor={setBtnColor} setGreeting={setGreeting} user={user}/> } />
      </Routes>
    </div>
    <Navbar setGreeting={setGreeting} selectedPage={selectedPage} btnColor={btnColor} />
   </>
  );
};
