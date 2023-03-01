const userController = {};



module.exports = userController;


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
  
