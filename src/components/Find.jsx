import React, { useState, useEffect } from 'react';

export const Find = ({user, setGreeting, setBtnColor}) => {

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
        <div className='resultArea'>You can't out pizza the hut</div>
        <div className='response'>
          <div className='res'>X</div>
          <div className='res'>./</div>
          <div className='res'>-</div>
        </div>
        
        <p className='resultInfo'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, perspiciatis tempore quisquam hic reiciendis nihil commodi nisi necessitatibus deserunt. Dolorem consequatur fugit.
        </p>
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