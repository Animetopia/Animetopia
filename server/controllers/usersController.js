const db = require("../models/animeModels");

const usersController = {};

// create functionality for user table
usersController.signUp = (req, res, next) => {
  // in req.body we have username and password money is fixed amt
  // desanitize data from req.body
  const { email, username, password } = req.body;

  // "id" serial NOT NULL,
  // "email" varchar UNIQUE NOT NULL,
  // "username" varchar UNIQUE NOT NULL,
  // "password" varchar NOT NULL,
  // query string with SQL query of creating a new row for users table and returning that value in the promise
  const queryString = `INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *`;

  // values we are going to insert into database
  const values = [email, username, password];

  //sends SQL query and values to be passed into SQL user table
  db.query(queryString, values)
    // promise chaining query -> results are the return value of SQL query string
    .then((results) => {
      console.log("Here is the newUser: ", results.rows[0]);
      // saving user to locals.newUser so we can output in user's route
      res.locals.newUser = results.rows[0];
      // return next middleware
      return next();
    })
    // error catching
    .catch((err) =>
      next({
        log: "Error in signup middleware",
        message: { err },
      })
    );
};

// read functionality for user table
usersController.login = (req, res, next) => {
  const { username, password } = req.body;

  const queryString = `SELECT * FROM users WHERE username = $1`;
  // values we are going to insert into database
  const values = [username];

  db.query(queryString, values)
    .then((results) => {
      //we check for correct passwords and they will continue
      // results.rows accesses an array of user objects
      // we use 0th index since there is only going to be one unique match
      // this object has properties of id, money, username, password
      if (results.rows[0].password === password) {
        res.locals.currUser = results.rows[0];
        return next();
      } else {
        // this is the case where username is a match but password is not
        // not a server error but user error so thinking we redirect to same page
        // with an error message
        // for now we are going to send 406 status code
        res.status(406).json();
      }
    })
    .catch((err) => {
      return next(err);
    });
};

usersController.checkDescription = (req, res, next) => {
  const { username } = req.body;
  const queryString =
    "SELECT user_description FROM public.users WHERE username = $1";
  const values = [username];
  db.query(queryString, values)
    .then((results) => {
      if (results.rows.length > 0) {
        res.locals.user_description = results.rows[0].user_description;
      } else {
        res.locals.user_description = null;
      }
      return next();
    })
    .catch((error) => {
      return next(error);
    });
};

usersController.saveDescription = (req, res, next) => {
  const { description } = req.body;
  const queryString = "INSERT INTO users(user_description) VALUES ($1) ";
  const values = [description];
  db.query(queryString, values).then((results) => {
    if (results.rows.length > 0) {
      console.log("The description was saved: ", results.rows[0]);
      res.locals.savedMessage = results.rows[0];
    }else {
      res.locals.savedMessage = null
    }
    return next();
  })
  .catch((error) => {
    return next(error);
  });
};

module.exports = usersController;
