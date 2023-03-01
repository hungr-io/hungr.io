import React, { useState, useEffect } from 'react';
import heartIcon from '/src/assets/heart.svg';
import arrowIcon from '/src/assets/arrow.svg';
import xIcon from '/src/assets/xIcon.svg';

export const Find = ({user, setGreeting, setBtnColor, restaurants}) => {

  useEffect(() => {
    setGreeting(`Welcome, ${user}`)
    setBtnColor('grey');
  }, [user]);


  return (
    <div className='find'>
      <div className='findSettings'>
        <div className='searchInput'>R</div>
        <div className='searchInput'>C</div>
        <div className='searchInput'>$</div>
      </div>
      <div className='findResult'>
        <div className='resultArea'>

          <div className='resName'>
            {restaurants[0]?.name}
          </div>

          <div className='resImage'>
            <img src={restaurants[0]?.image_url} 
            width='135'
            alt="404" />
          </div>

          <div className='resBio'>
            <div>
              {restaurants[0]?.price}
            </div>
            <div>
            {Math.floor(restaurants[0]?.distance )} meters
            </div>
            
          </div>

        </div>
        <div className='response'>
          <div className='res'
          style={{backgroundColor: '#f26f6f'}}
          >
            <img src={xIcon} alt='X' />
          </div>
          <div className='res'
          // style={{backgroundColor: '#72ed78'}}
          >
            <img src={heartIcon}></img>
          </div>
          <div className='res'
          // href={restaurants[0]?.url}
          style={{backgroundColor: '#6f7cf2'}}
          >
            <img src={arrowIcon}></img>
          </div>
        </div>
        
        <p className='resultInfo'>
          {restaurants[0]?.display_phone} <br />
        </p>
        <div>
          {restaurants[0]?.categories.map((el, i) => {
            <div>
              
            </div>
          })}
        </div>
        </div>
    </div>
  );
};

      /* <div id="header_find">
        <div id="header_find_caption">
          <p>HELLOWWW</p>
        </div>
        <div id="header_find_sort" className="flex flex-row justify-between gap-3">
          <div>
            <select name="" id=""></select>
          </div>
          <div>
            <select name="" id=""></select>
          </div>
          <div>
            <select name="" id=""></select>
          </div>
        </div>
      </div>
      <div id="body_find">
        <div>

        </div>
        <div>

        </div>
        <div id="find_buttons">

        </div>
      </div> */