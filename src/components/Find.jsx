import React, { useState, useEffect } from 'react';

export const Find = ({user, setGreeting, setBtnColor}) => {
  useEffect(() => {
    setGreeting(`Welcome, ${user}`)
    setBtnColor('grey');
  }, [user]);
  return (
    <div>
      find
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, consequuntur recusandae, officia corrupti ad, ut laboriosam est fuga veritatis odit minus aliquid iure modi architecto. Tenetur deleniti explicabo unde voluptates.
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, consequuntur recusandae, officia corrupti ad, ut laboriosam est fuga veritatis odit minus aliquid iure modi architecto. Tenetur deleniti explicabo unde voluptates.
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, consequuntur recusandae, officia corrupti ad, ut laboriosam est fuga veritatis odit minus aliquid iure modi architecto. Tenetur deleniti explicabo unde voluptates.
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, consequuntur recusandae, officia corrupti ad, ut laboriosam est fuga veritatis odit minus aliquid iure modi architecto. Tenetur deleniti explicabo unde voluptates.
   
      {/* <div id="header_find">
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
      </div> */}

    </div>
  )
}