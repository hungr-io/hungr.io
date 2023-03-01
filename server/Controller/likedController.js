const Restaurants = require('../models/mongooseModel')

// NEED TO GIVE IDENTIFIER FOR WHICH USER 

const likedController = {};

likedController.getLikes = (req, res, next) => {
    res.locals.likes = [];

    Restaurants.find()
      .then(res => {
        for (let i = 0; i < res.length; i++) {
            res.locals.likes.push(res[i]);
            console.log(`Liked restaurant at index ${i}: `, res.locals.likes[i]);
        };
        return next();
      })
      .catch(err => {
        const newErr = {
            log: 'Error in getLikes middleware',
            status: 500
        };
        return next(newErr);
      })
};

// need to check for correct req.body format
likedController.newLike = (req, res, next) => {
    const { name, address, price, zip, url, image, alias, title } = req.body;
    const newRest = new Restaurants({
        name: name,
        address: address,
        price: price,
        zip: zip,
        category: [{
            alias: alias,
            title: title,
        }],
        url: url,
        image: image,
    });

    newRest.save()
    .then(rest => {
      res.locals.rest = rest;
      console.log('User Liked: ', rest);
      return next();
    })
    .catch(err => {
      const newErr = {
        log: 'Error in newLike middleware',
        status: 500
      };
      return next(newErr);
    });

    likedController.deleteLike = (req, res, next) => {
        console.log('test')
    };
};

module.exports = likedController;