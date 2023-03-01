import React, { useState, useEffect } from 'react';
import reactIcon from '/src/assets/react.svg'

export const Likes = ({user, setGreeting}) => {
  
  const [likes, setLikes] = useState([{name: 'McDonalds', price: '$', img: reactIcon}, 
  {name: 'Pizza Hut', price: '$$', img: reactIcon},
  {name: 'Sushi Sen', price: '$$$$', img: reactIcon},
]);

  console.log(likes) 
  useEffect(() => {
    setGreeting(`${user}'s Favorites`);
    // getLikes();
  }, [user]);

  const getLikes = () => {
    console.log('getting likes...')
    //fetch likes
    //set likes state
    // setLikes([{name: 'McDonalds', price: '$$$'}])
  }

  return (
    <div className='likes'>
      {likes.map((el, i) => (
        <div key={i} className='likesContainer'>
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
            <button className='likesDelBtn'>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}