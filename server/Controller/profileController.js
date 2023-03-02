const db = require('../models/models');

const profileController = {};

profileController.selectAll = (req, res, next) => {
  // const values = ['mhenely@test.com', 'Matt', 'testing123', 60610]
  // const query = `
  //       INSERT INTO users (email, name, password, zip)
  //       VALUES ($1, $2, $3, $4);`

  // db.query(query,values)
  // return next();
  const query = `SELECT * FROM users;`
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
};

profileController.editUser = (req, res, next) => {

    // const { _id, zip, name } = req.body;
    const id = Number(req.body._id);
    const zip = Number(req.body.zip);
    const name = req.body.name;
    const values = [id, zip, name];
    const query = `
        UPDATE users
        SET name = $3, zip = $2}
        WHERE _id = $1;`
    console.log('QUERY: ', query)
    db.query(query, values)
    .then(result => {
      console.log('marker')
    })
    .catch(err => {
      const newErr = {
          log: 'Error in newLike Find middleware',
          status: 500
      };
      return next(newErr);
    })
    return next();
};


module.exports = profileController;