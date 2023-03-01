import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom'; 
import { Navbar } from './Navbar.jsx';
import { Header } from './Header.jsx';
import { Find } from './Find.jsx';
import { Bio } from './Bio.jsx';
import { Likes } from './Likes.jsx';
import profileTemp from '/src/assets/profile.png'


export const Home = ({selectedPage, user, setUser}) => {
  const [greeting, setGreeting] = useState(`Welcome,  ${user}`);
  const [btnColor, setBtnColor] = useState('none');
  const [zip, setZipcode] = useState('00000');
  const [img, setImg] = useState(profileTemp);
  const [radius, setRadius] = useState(10);
  const [rating, setRating] = useState(1);
  const [cuisine, setCuisine] = useState('');
  const [expense, setExpense] = useState('$');
  const [restaurants, setRestaurants] = useState([]);
  const [address, setAddress] = useState('2727 Agua Fria Fwy');
  const [userData, setUserData] = useState({name: user, zip: zip, img: 'img'});
  const [likes, setLikes] = useState([]);

  // const [selectedPage, setSelectedPage] = useState('');
  // const [user, setUser] = useState('user');
  const navigate = useNavigate();

  const fetchData = () => {

    fetch('/api/find', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating: String(rating), type: '', distance: '5', expense: String(expense.length), address, zip }),
    })
    .then(res => (res.json()))
    .then(data => {
      console.log('data: ', data)
      setRestaurants(data);
    })
    .catch(err => console.log(err));

  }


  return (
    <>
      <Header greeting={greeting} user={user} />
      <div>
        <Routes>
          <Route path='/bio' element={ <Bio img={img} setImg={setImg} setZipcode={setZipcode} setUser={setUser} setBtnColor={setBtnColor} setGreeting={setGreeting} user={user} zip={zip}/> } />
          <Route path='/likes' element={ <Likes setBtnColor={setBtnColor} likes={likes} setLikes={setLikes} setGreeting={setGreeting} user={user}/> } />
          <Route path='/find' element={ <Find setBtnColor={setBtnColor} likes={likes} setLikes={setLikes} rating={rating} expense={expense} setExpense={setExpense} 
            setRestaurants={setRestaurants} setGreeting={setGreeting} setRating={setRating} user={user} restaurants={restaurants}/> } />
      </Routes>
    </div>
    <Navbar img={img} fetchData={fetchData} setGreeting={setGreeting} selectedPage={selectedPage} btnColor={btnColor} />
   </>
  );
};
