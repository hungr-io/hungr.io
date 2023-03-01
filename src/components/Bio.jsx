import React, { useState, useEffect } from 'react';


export const Bio = ({user, setGreeting, zip, img, setImg}) => {
  useEffect(() => {
    setGreeting(`Welcome, ${user}`)
  }, [user]);

  const editImg = async () => {
    console.log('editing profile...')

    // var inputDiv = document.querySelector('.inputDiv')
    // var input = document.querySelector('.inputDiv input')
    // input.addEventListener('change', () => {
    //   let files = input.files
    //   console.log(files)
    // })

  }

  useEffect(() => {
    var inputDiv = document.querySelector('.inputDiv')
    var input = document.querySelector('.inputDiv input')
    input.addEventListener('change', () => {
      let files = input.files[0]
      console.log(files)
      files = URL.createObjectURL(files)
      console.log(files)
      setImg(files);


    })
  }, [editImg])

  
console.log(img)

  return (
    <div className='bio'>
      <div className='image'>
        <img className='bioImg' src={img} />
      </div>
      <div className='inputDiv'>
        {/* <label for="files">Select Image</label> */}
        <label for='file' className='browse'>Upload Image</label>
        <input id='file' type='file' className='file' multiple='multiple' accept='image/png, image/jpeg, image/jpg'
        // onClick={editImg} 
        style={{display: 'none'}}
          >
        </input>
        {/* <button onClick={editImg}>Upload Image</button> */}
      </div>
      <div className='zipBio'>
        {zip}
      </div>
      <div className='userBio'>
        {user}
      </div>
      <button>Edit</button>
      <button>Log Out</button>

    </div>
  )
}