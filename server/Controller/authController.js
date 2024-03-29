const { OAuth2Client } = require("google-auth-library");
const { default: jwtDecode } = require("jwt-decode");
const jwt = require("jsonwebtoken");
const db = require("../models/models.js");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const GOOGLE_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// NEED TO ADD TOKEN CHECK

const authController = {};

// function to verify google account
const verifyGoogleToken = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (err) {
    return { error: "Invalid user detected. Please try again." };
  }
};

// verifies user upon login
authController.verifyUser = async (req, res, next) => {
  console.log("entered verifyUser middleware");
  const { data, loginMethod } = req.body;
  console.log("login method is: ", loginMethod);

  // verification for google accounts
  if (loginMethod === "google") {
    try {
      const verificationResponse = await verifyGoogleToken(data);
      if (verificationResponse.error) next(verificationResponse.error);

      const profile = verificationResponse?.payload;
      console.log("profile: ", verificationResponse.payload);
      console.log("profile 2 is: ", profile.email);

      // REVIEW THIS SECTION
      const userQuery = `SELECT * FROM users WHERE email = '${profile.email}' AND password = '${profile.sub}'`;
      const existsInDB = await db.query(userQuery);
      console.log("google existsInDB: ", existsInDB.rows[0]);

      if (!existsInDB) return res.status(403).json("err");

      res.locals.user = {
        name: existsInDB.rows[0].name,
        picture: existsInDB.rows[0].image,
        email: existsInDB.rows[0].email,
        token: jwt.sign({ email: existsInDB.rows[0].email }, GOOGLE_SECRET, {
          expiresIn: "1d",
        }),
        zip: existsInDB.rows[0].zip,
      };

      res.locals.message = "Login was successful";

      return next();
    } catch (err) {
      next(err);
    }
  }

  // verification for non-google users
  else if (loginMethod === "manual") {
    try {
      const userQuery = `SELECT * FROM users WHERE email = '${data.email}' AND password = '${data.password}'`;
      const existsInDB = await db.query(userQuery);
      console.log("reg user existsInDb: ", existsInDB.rows[0]);

      if (existsInDB.rows[0] === undefined) return res.status(403).json("err");

      res.locals.user = {
        name: existsInDB.rows[0].name,
        picture: existsInDB.rows[0].image,
        email: existsInDB.rows[0].email,
        token: jwt.sign({ email: existsInDB.rows[0].email }, GOOGLE_SECRET, {
          expiresIn: "1d",
        }),
        zip: existsInDB.rows[0].zip,
      };

      res.locals.message = "Login was successful";

      return next();
    } catch (err) {
      next(err);
    }
  }
};

// user signup
authController.userSignup = async (req, res, next) => {
  console.log("entered userSignup middleware", req.body);
  const { data, loginMethod } = req.body;

  // verification for google accounts
  if (loginMethod === "google") {
    try {
      const verificationResponse = await verifyGoogleToken(data);
      if (verificationResponse.error)
        next({ message: verificationResponse.error });

      const profile = verificationResponse?.payload;
      console.log("profile: ", profile);

      // REVIEW THIS SECTION
      const userQuery = `SELECT * FROM users WHERE email = '${profile.email}' AND password = '${profile.sub}'`;
      const existsInDB = await db.query(userQuery);
      console.log("google existsInDB: ", existsInDB.rows[0]);

      // db.query(userQuery)
      //   .then((response) => console.log(response.rows) )

      if (existsInDB.rows.length < 1) {
        console.log("here i am");
        const insertQuery = `INSERT INTO users (name, email, password) VALUES ('${profile.name}', '${profile.email}', '${profile.sub}') RETURNING *`;
        const addToDB = await db.query(insertQuery);
        console.log("google existsInDB: ", addToDB.rows[0]);

        res.locals.user = {
          id: addToDB.rows[0]?._id,
          name: addToDB.rows[0]?.name,
          picture: addToDB.rows[0]?.image,
          email: addToDB.rows[0]?.email,
          token: jwt.sign({ email: addToDB.rows[0].email }, GOOGLE_SECRET, {
            expiresIn: "1d",
          }),
          zip: addToDB.rows[0]?.zip,
        };
      } else {
        res.locals.user = {
          id: addToDB.rows[0]?._id,
          name: existsInDB.rows[0]?.name,
          picture: existsInDB.rows[0]?.image,
          email: existsInDB.rows[0]?.email,
          token: jwt.sign({ email: existsInDB.rows[0].email }, GOOGLE_SECRET, {
            expiresIn: "1d",
          }),
          zip: existsInDB.rows[0]?.zip,
        };
      }

      res.locals.message = "Login was successful";

      return next();
    } catch (err) {
      next(err);
    }
  }

  // verification for non-google users
  else if (loginMethod === "manual") {
    console.log(req.body);
    try {
      const value = [data.email, data.username, data.password];
      const userQuery = `INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING *`;
      // const addToDB = await db.query(userQuery, value);
      // console.log("manual addToDB: ", addToDB);
      db.query(userQuery, value).then((data) => {
        console.log(data);
        res.locals.user = {
          name: data.rows[0]?.name,
          picture: data.rows[0]?.image,
          email: data.rows[0]?.email,
          // token: jwt.sign({ email: data.rows[0].email }, "mySecret", {
          //   expiresIn: "1d",
          // }),
        };
        res.locals.message = "Signup was successful";
        return next();
      });
    } catch (err) {
      next({ message: "An error occurred. Registration failed." });
    }
  }
};

module.exports = authController;
