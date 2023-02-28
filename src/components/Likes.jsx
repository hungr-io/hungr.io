import React, { useState, useEffect } from 'react';


export const Likes = ({user, setGreeting}) => {
  
  const [likes, setLikes] = useState([{name: 'McDonalds', price: '$', img: '/src/assets/react.svg'}, 
  {name: 'Pizza Hut', price: '$$', img: '/src/assets/react.svg'},
  {name: 'Sushi Sen', price: '$$$$', img: '/src/assets/react.svg'},
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