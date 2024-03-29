import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom'; 
import { Navbar } from './Navbar.jsx';
import { Header } from './Header.jsx';
import { Find } from './Find.jsx';
import { Bio } from './Bio.jsx';
import { Likes } from './Likes.jsx';
import profileTemp from '/src/assets/profile.png'
//profile.jpg

export const Home = ({selectedPage, user}) => {
  const [greeting, setGreeting] = useState(`Welcome,  ${user}`);
  const [btnColor, setBtnColor] = useState('none');
  const [zip, setZipcode] = useState('60610');
  const [img, setImg] = useState(profileTemp);
  const [radius, setRadius] = useState(10);
  const [rating, setRating] = useState(1);
  const [cuisine, setCuisine] = useState('');
  const [expense, setExpense] = useState('$');
  const [restaurants, setRestaurants] = useState([]);
  const [address, setAddress] = useState(null);
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
    //for dev
    // setRestaurants([
    //   {
    //     "id": "BV9-Euw29Y20EgZfqqJM7Q",
    //     "alias": "flavor-fusions-cafe-arcadia",
    //     "name": "Flavor Fusions Cafe",
    //     "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/_z7pKuLESWR8VxvJd8QYYA/o.jpg",
    //     "is_closed": false,
    //     "url": "https://www.yelp.com/biz/flavor-fusions-cafe-arcadia?adjust_creative=-0G0Rxtu31EMZ-S81IbmHQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=-0G0Rxtu31EMZ-S81IbmHQ",
    //     "review_count": 76,
    //     "categories": [
    //       {
    //         "alias": "japanese",
    //         "title": "Japanese"
    //       },
    //       {
    //         "alias": "sandwiches",
    //         "title": "Sandwiches"
    //       },
    //       {
    //         "alias": "coffee",
    //         "title": "Coffee & Tea"
    //       }
    //     ],
    //     "rating": 4.5,
    //     "coordinates": {
    //       "latitude": 34.13485903087252,
    //       "longitude": -118.02806847886603
    //     },
    //     "transactions": [
    //       "pickup",
    //       "delivery"
    //     ],
    //     "price": "$$",
    //     "location": {
    //       "address1": "420 S 1st Ave",
    //       "address2": null,
    //       "address3": "",
    //       "city": "Arcadia",
    //       "zip_code": "91006",
    //       "country": "US",
    //       "state": "CA",
    //       "display_address": [
    //         "420 S 1st Ave",
    //         "Arcadia, CA 91006"
    //       ]
    //     },
    //     "phone": "+16266312089",
    //     "display_phone": "(626) 631-2089",
    //     "distance": 260.31492560185035
    //   },
    //   {
    //     "id": "xlFFzHz2ibDIkXF3gQnWCA",
    //     "alias": "spices-thai-kitchen-arcadia",
    //     "name": "Spices Thai Kitchen",
    //     "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/81a40e4RQNHg48nZZqC5fA/o.jpg",
    //     "is_closed": false,
    //     "url": "https://www.yelp.com/biz/spices-thai-kitchen-arcadia?adjust_creative=-0G0Rxtu31EMZ-S81IbmHQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=-0G0Rxtu31EMZ-S81IbmHQ",
    //     "review_count": 494,
    //     "categories": [
    //       {
    //         "alias": "thai",
    //         "title": "Thai"
    //       }
    //     ],
    //     "rating": 4.5,
    //     "coordinates": {
    //       "latitude": 34.135435,
    //       "longitude": -118.028122
    //     },
    //     "transactions": [
    //       "delivery"
    //     ],
    //     "price": "$",
    //     "location": {
    //       "address1": "402 S 1st Ave",
    //       "address2": "",
    //       "address3": "",
    //       "city": "Arcadia",
    //       "zip_code": "91006",
    //       "country": "US",
    //       "state": "CA",
    //       "display_address": [
    //         "402 S 1st Ave",
    //         "Arcadia, CA 91006"
    //       ]
    //     },
    //     "phone": "+16264467703",
    //     "display_phone": "(626) 446-7703",
    //     "distance": 302.0601025480873
    //   },
    // ])

  }


  return (
    <>
      <Header greeting={greeting} user={user} />
      <div>
        <Routes>
          <Route path='/bio' element={ <Bio address={address} setAddress={setAddress} img={img} setImg={setImg} setBtnColor={setBtnColor} setGreeting={setGreeting} user={user} zip={zip}/> } />
          <Route path='/likes' element={ <Likes setBtnColor={setBtnColor} likes={likes} setLikes={setLikes} setGreeting={setGreeting} user={user}/> } />
          <Route path='/find' element={ <Find setBtnColor={setBtnColor} likes={likes} setLikes={setLikes} rating={rating} expense={expense} setExpense={setExpense} 
            setRestaurants={setRestaurants} setGreeting={setGreeting} setRating={setRating} user={user} restaurants={restaurants}/> } />
      </Routes>
    </div>
    <Navbar img={img} fetchData={fetchData} setGreeting={setGreeting} selectedPage={selectedPage} btnColor={btnColor} />
   </>
  );
};
