const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve bundle
app.use(express.static(path.join(__dirname, '../dist')));

// middleware
//app.get('/user' userRouter)

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
// 