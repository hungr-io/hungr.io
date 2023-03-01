import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 


export const Bio = ({user, setUser, setGreeting, zip, setZipcode, img, setImg}) => {
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

  const assignZip = (e) => {
    console.log(e)
    setZipcode(e)
  }
  
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
        Zip:
        <input type="text" 
        onChange = {(e) => {assignZip(e.target.value)}}
        className='userInfo' accept='number' placeholder={zip}/>
        {/* {zip} */}
      </div>
      <div className='userBio'>
        Name: 
        <input type="text" 
        // onChange = {(e) => {setUser(e.target.value)}}
        className='userInfo' placeholder={user}/>
        {/* {user} */}
      </div>
      <button>Save</button>
      <Link to='/'>Sign Out</Link>
      {/* <button>Log Out</button> */}

    </div>
  )
}