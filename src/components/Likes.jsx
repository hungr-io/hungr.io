import React, { useState, useEffect } from 'react';
import reactIcon from '/src/assets/heart.png'


export const Likes = ({user, setGreeting, likes, setLikes}) => {
  
  

  
  useEffect(() => {
    setGreeting(`${user}'s Favorites`);
    getLikes();
    // console.log(likes) 
  }, [user]);

  const getPrice = (data) => {
    let price = ''
    for (let i = 0; i < data?.price; i++) {
      price += '$'
    }
    console.log(price);
    return price;
  }

  const getLikes = () => {
    console.log('getting likes...')
    //fetch likes
    // fetch('/likes')
    // .then(res => res.json())
    // .then(data => {
    //   console.log(data)
    //   setLikes(data);
    // })
    // .catch(err => console.log(err))
    // //set likes state for dev
    // setLikes([{name: 'McDonalds', price: '$', img: reactIcon}, 
    //   {name: 'Pizza Hut', price: '$$', img: reactIcon},
    //   {name: 'Sushi Sen', price: '$$$$', img: reactIcon},
    // ]);
  }

  const getLink = (url) => {
    window.open(
      url, "_blank");
  }

  const deleteFav = (id) => {
    console.log('deleting fav by id...')
    fetch('api/deleteFav', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setLikes(data);
    })
  }

  const makeArr = () => {
    if (likes[0]) return likes.map((el, i) => (
      <div key={i} id={el._id} className='likesContainer'>
        <div className='likesImg'
          onClick={() => getLink(el?.url)}>
          <img src={el.image}
            width='45'
          ></img>
        </div>
        <div>
          <div className='likesName'>
            {el.name}
          </div>
          <div>
            {getPrice(el)}
          </div>
          <div>
            {el.phone}
          </div>
        </div>
        <div >
          <button className='likesDelBtn' onClick={() => deleteFav(el._id)}>Delete</button>
        </div>
      </div>
    ))
    else return [];
  }
  const likesArr = makeArr()
  
  return (
    <div className='likes'>
      {likesArr}
      {/* {likes.map((el, i) => (
        <div key={i} id={el._id} className='likesContainer'>
          <div className='likesImg'>
            <img src={el.img}></img>
          </div>
          <div>
            <div className='likesName'>
              {el.name}
            </div>
            <div>
              {el.price}
            </div>
          </div>
          <div >
            <button className='likesDelBtn' onClick={() => deleteFav(el._id)}>Delete</button>
          </div>
        </div>
      ))} */}
    </div>
  )
}