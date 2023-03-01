const findController = {};
// const sdk = require('api')('@yelp-developers/v1.0#2vqu0dboldn2hxnb');
// sdk.auth('Bearer PZE2q4mOvdMPr2LuGsUJ5InmxDea9UJl15KQI8AK7r4MoggvcbFl0qoOxpVBhDZjEteZKe8Jxpjjigp1qbcYpG3ghjdqY761jCRPZg1Rcfafu4QNuwm7whxkM0n9Y3Yx');

findController.findNew = (req, res, next) => {
    res.locals.findData = [];
    // need to figure out whether you can query by rating or if post-fetch filtering must be done
    console.log('REQ.BODY IN FINDNOW: ', req.body)
<<<<<<< HEAD
    const { rating, expense, type, address, zip } = req.body;
    let distance = Math.floor(req.body.distance * 1609);
   
    let price = ''; 
    if (expense) {
        for (let i = 0; i < expense.length -1; i++) {
            price += expense[i] + '%2C'
=======
    const { rating, type, expense, address, zip } = req.body;
    let price = ''; 
    if (expense) {
        for (let i = 0; i < expense.length -1; i++) {
            price += expense[i] + '$2C'
>>>>>>> dev

        }
        price += expense[expense.length - 1];
    }
                                
    let location = "";
    if (address) {
        for (let i = 0; i < address.length; i++) {
            if (address[i] === ' ') {
                location += '%20'
            } else if (address[i] === ',') {
                location += '%2C'
            } else {
                location += address[i]
            }
        }
    }
    if (zip) {
        location += '%2C%20' + zip
    };

    // convert distance from miles to meters
<<<<<<< HEAD
=======
    let distance = (req.body.distance * 1609)
>>>>>>> dev
    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer PZE2q4mOvdMPr2LuGsUJ5InmxDea9UJl15KQI8AK7r4MoggvcbFl0qoOxpVBhDZjEteZKe8Jxpjjigp1qbcYpG3ghjdqY761jCRPZg1Rcfafu4QNuwm7whxkM0n9Y3Yx'
        }
      };
<<<<<<< HEAD
      
      fetch(`https://api.yelp.com/v3/businesses/search?location=${location}&term=food&radius=${distance}&categories=${type}&price=${price}&sort_by=rating&limit=20`, options)
=======
    //   fetch(`https://api.yelp.com/v3/businesses/search?location=${location}&term=food&radius=${distance}&categories=japanese&price=${price}&sort_by=rating&limit=20`, options)
      fetch(`https://api.yelp.com/v3/businesses/search?location=${location}&term=food&radius=${distance}&price=${price}&sort_by=rating&limit=20`, options)
>>>>>>> dev
        .then(data => data.json())
        .then(data => {
          data.businesses.forEach(restaurant => {
            const newRest = {
                name: restaurant.name,
                address: restaurant.location.address1,
                // restaurant.price will be returned as a string of between 1-4 $s
                // 1 is cheapest, 4 is most expensive
                price: restaurant.price.length,
                zip: restaurant.location.zip_code,
                url: restaurant.url,
                image: restaurant.image_url,
                rating: restaurant.rating,
<<<<<<< HEAD
=======
                phone: restaurant.display_phone,
>>>>>>> dev
            };
            const categoryArray = [];
            if (restaurant.category) {
                restaurant.category.forEach(elem => {
                    const categoryObj = {
                        alias: elem.alias,
                        title: elem.title
                    };
                    categoryArray.push(categoryObj)
                });
            }
            newRest.category = categoryArray;
            res.locals.findData.push(newRest);
          })
          return next();
        })
        .catch(err => {
          const newErr = {
            log: 'Error in the FINDNew middleware', 
            status: 500
          }
          return next(newErr);
        })
}

module.exports = findController;