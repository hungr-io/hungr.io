import React, { useState, useEffect } from 'react';
import reactIcon from '/src/assets/react.svg'


export const Likes = ({user, setGreeting}) => {
  
  const [likes, setLikes] = useState([]);

  
  useEffect(() => {
    setGreeting(`${user}'s Favorites`);
    getLikes();
    // console.log(likes) 
  }, [user]);

  const getLikes = () => {
    console.log('getting likes...')
    //fetch likes
    fetch('api/getLikes')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setLikes(data);
    })
    .catch(err => console.log(err))
    //set likes state for dev
    setLikes([{name: 'McDonalds', price: '$', img: reactIcon}, 
      {name: 'Pizza Hut', price: '$$', img: reactIcon},
      {name: 'Sushi Sen', price: '$$$$', img: reactIcon},
    ]);
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

  return (
    <div className='likes'>
      {likes.map((el, i) => (
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
      ))}
    </div>
  )
}