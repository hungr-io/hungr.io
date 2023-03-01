const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve bundle

const authController = require('./Controller/authController');app.use(express.static(path.join(__dirname, '../dist')));

// middleware
//app.get('/user' userRouter)

// 404 not found
app.use((req, res) => res.status(404).send('404 page not found'));


// global err
// login 
app.post('/login', authController.verifyUser, (req, res) => {
  console.log(res.locals.message);
  return res.status(200).json(res.locals.user);
})


// signup
app.post('/signup', authController.userSignup, (req, res) => {
  console.log(res.locals.message);
  return res.status(200).json(res.locals.user);
})

app.use((err, req, res, next) => {
    const defaultErr = 
      {
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: { err: 'An error occurred, global handler' }, 
      }
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log)
    res.status(errorObj.status).json(errorObj.message)
    // res.status(errorObj.status).json(errorObj.message)
});

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
module.exports = app;


// what middleware is needed?
// SJSON.strigingify.stringify(){messag message:  }{}, err{ : errerrorsend