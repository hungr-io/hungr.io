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
  const [options, setOptions] = useState({radius: 50, cuisine: '', cost: '$'});
  const [restaurants, setRestaurants] = useState([]);

  // const [selectedPage, setSelectedPage] = useState('');
  // const [user, setUser] = useState('user');
  const navigate = useNavigate();
  const fetchData = () => {
    

    fetch('/api/getRestaurants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ options }),
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }


  return (
    <>
      <Header greeting={greeting} user={user} />
      <div>
        <Routes>
          <Route path='/bio' element={ <Bio setBtnColor={setBtnColor} setGreeting={setGreeting} user={user} zipcode={zipcode}/> } />
          <Route path='/likes' element={ <Likes setBtnColor={setBtnColor} setGreeting={setGreeting} user={user}/> } />
          <Route path='/find' element={ <Find setBtnColor={setBtnColor} setGreeting={setGreeting} user={user} restaurants={restaurants}/> } />
      </Routes>
    </div>
    <Navbar fetchData={fetchData} setGreeting={setGreeting} selectedPage={selectedPage} btnColor={btnColor} />
   </>
  );
};
