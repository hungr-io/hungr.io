const Restaurant = require('../models/mongooseModel')
const db = require('../models/models');

// NEED TO GIVE IDENTIFIER FOR WHICH USER 

const likedController = {};

likedController.selectAll = (req, res, next) => {
    const query = `SELECT * FROM likes;`
    db.query(query)
    .then(data => {
        console.log(data);
        return next()
    })
    .catch(err => {
        const newErr = {
            log: 'Error in getLikes middleware',
            status: 500
        };
        return next(newErr);
      });
}

likedController.getLikes = async (req, res, next) => {
    // const { user_id } = req.body; 
    const user_id = 40;

    res.locals.likes = [];
    const userArray = [];

    const query = `SELECT restaurant_id FROM likes WHERE users_id=${user_id};`
    await db.query(query)
    .then(rests => {
        console.log(rests)
        for (let i = 0; i < rests.rows.length; i++) {
            console.log('MARKER')
            userArray.push(rests.rows[i].restaurant_id)
        };        
    })
    console.log('USERARRAY: ', userArray)
    await Restaurant.find({ address: { $in: userArray } })
      .then(rests => {
        for (let i = 0; i < rests.length; i++) {
            res.locals.likes.push(rests[i])
            console.log(`Liked restaurant at index ${i}: `, res.locals.likes[i]);
        };
      })
      .catch(err => {
        const newErr = {
            log: 'Error in getLikes middleware',
            status: 500
        };
        return next(newErr);
      });
    return next();
};

// need to check for correct req.body format
// need to check on the _id variable
likedController.newLike = async (req, res, next) => {
   
    const { name, address, price, zip, url, image, alias, title, rating } = req.body;
    const date = new Date().toDateString();
    const user_id = 40;
    let rest_id = '';
    
    await Restaurant.find({name: name, url: url})
    // .then(data => data.json())
    .then(data => {
        if (data[0]._id) {
            rest_id = data[0].address;
        }
    })
    // .catch(err => {
    //     const newErr = {
    //         log: 'Error in newLike SQL creation middleware 1',
    //         status: 500
    //     };
    //     return next(newErr);
    // });
    if (rest_id) {
        const values = [rest_id, user_id, date]
        const query = `
        INSERT INTO likes (restaurant_id, users_id, create_date)
        VALUES ($1, $2, $3);`
        await db.query(query, values)
    } else {
        const newRest = {
            name: name,
            address: address,
            price: price,
            zip: zip,
            url: url,
            image: image,
            rating: rating,
        };
        const newEntry = new Restaurant(newRest)
        await newEntry.save()
        .then(rest => {
            rest_id = rest.address;
        })
        .catch(err => {
            const newErr = {
                log: 'Error in newLike MongoDB creation middleware ',
                status: 500
            };
            return next(newErr);
        });
        const values = [rest_id, user_id, date]
        const query = `
        INSERT INTO likes (restaurant_id, users_id, create_date)
        VALUES ($1, $2, $3);`
        await db.query(query, values)
        .then(rest => {
            res.locals.newLike = rest;
            return next();
        })
        .catch(err => {
            const newErr = {
                log: 'Error in newLike Find SQL INSERT middleware2',
                status: 500
            };
            return next(newErr);
        });
    }
    console.log('rest ', rest_id);
    return next();
};

likedController.deleteLike = async (req, res, next) => {
    const { user_id, rest_id } = req.body
    console.log(req.body)

    const user = Number(user_id);
    // SQL DELETE ?
    const values = [user, rest_id]
    
    const query = `
    DELETE FROM likes 
    WHERE users_id = $1
    AND restaurant_id = $2;`
    console.log(query)
    console.log(values)

    await db.query(query, values)
    .then(rest => {
            res.locals.deleted = rest;
            return next();
        })
    .catch(err => {
        const newErr = {
            log: 'Error in DeleteLike middleware',
            status: 500
        };
        return next(newErr);
    })
};

module.exports = likedController;