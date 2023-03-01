import React, { useState, useEffect } from 'react';
import heartIcon from '../assets/heart.png';
import arrowIcon from '/src/assets/arrow.png';
import xIcon from '/src/assets/xIcon.png';
import { CostDropdown, RatingDropdown } from './Dropdown';

export const Find = ({user, setGreeting, setBtnColor, restaurants, setRestaurants, rating, setRating, expense, setExpense, likes, setLikes}) => {
  const [, updateState] = useState();

  useEffect(() => {
    setGreeting(`Welcome, ${user}`)
    setBtnColor('grey');
    getRes();
    // removeRes()
  }, [user]);

  const forceUpdate = React.useCallback(() => updateState({}), []);

  const addLike = (data) => {
    console.log('adding like...')
    let temp = likes
    temp.push(data)
    console.log(temp)
    setLikes(temp)
  }

  const resPrice = () => {
    let price = ''
    for (let i = 0; i < restaurants[0]?.price; i++) {
      price += '$'
    }
    console.log(price);
    return price;
  }

  const removeRes = () => {
    let temp = restaurants;
    temp.shift();
    console.log(temp)
    // setRestaurants(null);
    setRestaurants(temp);
    setTimeout( forceUpdate() , 100)
    forceUpdate()
  }

  const getLink = () => {
    window.open(
      restaurants[0]?.url, "_blank");
  }

  const getRes = () => {
    let i = Math.floor(Math.random() * restaurants.length);
    if (!restaurants[0]) return <div style={{marginTop: '12rem', fontSize: 'larger'}}>Find more restaurants!</div>
    else return (
    <div className='findResult'>
    <div className='resultArea'>

      <div className='resName'>
        {restaurants[i]?.name}
      </div>

      <div className='resImage'>
        <img src={restaurants[i]?.image} 
        width='135'
        alt='404' />
      </div>

      <div className='resBio'>
        <div>
          Cost: {resPrice()}
        </div>
        <div>
        Rating: {Math.floor(restaurants[i]?.rating )} / 5
        </div>
        
      </div>

    </div>
    <div className='response'>
      <div className='res'
      onClick={removeRes}
      style={{backgroundColor: '#f26f6f'}}
      >
        <img src={xIcon} alt='X' />
      </div>
      <div className='res'
      onClick={() => addLike(restaurants[i])}
      // style={{backgroundColor: '#72ed78'}}
      >
        <img src={heartIcon}></img>
      </div>
      <div className='res'
      // href={restaurants[i]?.url}
      onClick={getLink}
      style={{backgroundColor: '#6f7cf2'}}
      >
        <img src={arrowIcon}></img>
      </div>
    </div>
    
    <div className='resultInfo'>
      <div>
        {restaurants[i]?.phone} 
      </div>
      <div>
        {restaurants[i]?.address}, <br />
        {restaurants[i]?.zip}
          {/* {restaurants[0]?.categories.map((el, i) => {
            <div>
              
            </div>
          })} */}
      </div>
    </div>
  </div>
  )
  }
// console.log(restaurants)
  return (
    <div className='findContainer'>
      <div className='find'>
        <div className='findSettings'>
          <div className='searchInput'>Rating: 
            <input className='input' type='number' id='quantity' min='1' max='5' placeholder={rating}
            onChange = {(e) => {setRating(e.target.value)}}/>
            / 5
          </div>
          {/* <div className='searchInput'>C</div> */}
          <div className='searchInput'>Cost: 
            <input className='input' type='text' id='expense' placeholder={expense}
            onChange = {(e) => {setExpense(e.target.value)}}/>
          </div>
        </div>
        {getRes()}
      </div>
    </div>
  );
};