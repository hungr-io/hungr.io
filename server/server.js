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
const authController = require('./Controller/authController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve bundle
// app.use(express.static('../dist'));
app.use(express.static(path.join(__dirname, '../dist')));


// login 
app.post('/login', authController.verifyUser, (req, res) => {
  console.log(res.locals.message);
  return res.status(200).json(res.locals.user);
})


// signin
app.post('/signin', authController.userSignup, (req, res) => {
  console.log(res.locals.message);
  return res.status(200).json(res.locals.user);
})


// find Restaurant middleware
app.post('/find', findController.findNew, (req, res) => {
  // console.log(res.locals.findData)
  return res.status(200).json(res.locals.findData);
});

// create new liked restaurant middleware
app.put('/likes', likedController.newLike, (req, res) => {
  return res.status(200).json(res.locals.rest);
});

// get users liked restaurant middleware
app.get('/likes', likedController.getLikes, (req, res) => {
  return res.status(200).json(res.locals.likes);
});

app.delete('/likes', likedController.deleteLike, (req, res) => {
  // this route works
  return res.status(200).json(res.locals.deleted)
});

app.patch('/profile', profileController.editUser, (req, res) => {
  //this route works
  return res.status(200).json();
});

app.get('/testing', likedController.selectAll, (req, res,) => {
  return res.status(200).json();
});

app.get('/testingProfile', profileController.selectAll, (req, res,) => {
  return res.status(200).json();
})

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

