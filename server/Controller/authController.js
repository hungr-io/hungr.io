const { OAuth2Client } = require("google-auth-library");
const { default: jwtDecode } = require("jwt-decode");
const db = require('../models/models.js');


const GOOGLE_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const GOOGLE_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);


const authController = {};

// function to verify google account
const verifyGoogleToken = async (token) => {
 
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload()};
  } catch (err) {
    return { error: "Invalid user detected. Please try again." };
  }

}

// verifies user upon login
authController.verifyUser = async (req, res, next) => {
  console.log('entered verifyUser middleware')
  const { data, loginMethod } = req;
  
  // verification for google accounts
  if (loginMethod === 'google') {
    try {
      const verificationResponse = await verifyGoogleToken(data);
      if (verificationResponse.error) next( { message: verificationResponse.error })
      
      const profile = verificationResponse?.payload;
      console.log('profile: ', profile);

      // REVIEW THIS SECTION
      const userQuery = `SELECT * FROM users WHERE email = ${profile.email}`
      const existsInDB = await db.query(userQuery).rows[0]
      console.log('google existsInDB: ', existsInDB);
     
      if(!existsInDB) next({ message: 'You are not registered. Please sign up'});

      res.locals.user = {
        name: profile?.name,
        picture: profile?.image,
        email: profile?.email,
        token: jwt.sign({ email: profile.email },GOOGLE_SECRET, { expiresIn: "1d" })
      };

      res.locals.message = 'Login was successful';

      return next();    

    } catch (err) { next(err); }
  }
  
  // verification for non-google users
  else if (loginMethod === 'manual') {
    try {
      const userQuery = `SELECT * FROM users WHERE email = ${data.email} AND password = ${data.password}`
      const existsInDB = await db.query(userQuery).rows[0];
      console.log('reg user existsInDb: ', existsInDB);

      if(!existsInDB) next({ message: 'You are not registered. Please sign up'});

      res.locals.user = {
        name: existsInDB.name,
        picture: existsInDB.image,
        email: existsInDB.email,
        token: jwt.sign({ email: existsInDB.email },GOOGLE_SECRET, { expiresIn: "1d" })
      };

      res.locals.message = 'Login was successful';
      
      return next();

    } catch (err) { next(err); }
  }

}


// user signup
authController.userSignup = async (req, res, next) => {

}

module.exports = authController;