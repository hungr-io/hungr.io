const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const path = require('path');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
// const PORT = 5173;

const findController = require('./Controller/findController');
const likedController = require('./Controller/likedController');
const profileController = require('./Controller/profileController');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve bundle
// app.use(express.static('../dist'));
app.use(express.static(path.join(__dirname, '../dist')));


// find Restaurant middleware
app.get('/find', findController.findNew, (req, res) => {
  console.log(res.locals.findData)
  return res.status(200).json(res.locals.findData);
});

// create new liked restaurant middleware
app.put('/find', likedController.newLike, (req, res) => {
  return res.status(200).json(res.locals.rest);
});

// get users liked restaurant middleware
app.get('/likes', likedController.getLikes, (req, res) => {
  return res.status(200).json(res.locals.likes);
});

// app.delete('/likes', likedController.deleteLike, (req, res, next) => {

// });

// 404 not found
app.use((req, res) => res.status(404).send('404 page not found'));

// global err
app.use((err, req, res, next) => {
    const defaultErr = 
      {
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: { err: 'An error occurred, global handler' }, 
      }
    const errorObj = Object.assign(defaultErr, err);
    console.log(errorObj.log)
    res.status(errorObj.status).send(JSON.stringify(errorObj.message))
});

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
module.exports = app;

// what middleware is needed?
// create a user => store their username/email and corresponding password
  // after create a user, redirect to set up profile page with userID set as a token?
    // must provide zipcode, name. 
      // on button click, write to DB with their corresponding userID
// authenticate user => check their username/email and password
  // if correct authentication, redirect to MAIN FIND page 
    // main page will initally serve a new restaurant 
      // if FIND buttton is clicked, then a new restaurant will be served; 
      // FIND BUTTON CAN BE CLICKED ON ANY PAGE AND REDIRECTS TO MAIN FIND PAGE
        // if default filters have changed, run a new fetch
          // generate random number to select which restaurant to serve 
        // if default unchanged, generate a new randomized number and serve that restaurant
          // check to make sure that not same as past number
    // if X BUTTON is clicked
        // remove current restaurant from feteched array 
        // then generate new randomized number and serve new restaurant 
    // if CHECK BUTTON (will become a HEART) is clicked, then write that restaurant to USER's Liked DB
      // then remove from current fetched array and generate new randomized number to serve;
    // if ARROW BUTTON is clicked
      // provide additional restaurant information (rendering on top of home/find page as a popup?)
    
// LIKES button is clicked 
  // redirect to Likes page
    // serve list of all restaurants that USER has previously liked
  


