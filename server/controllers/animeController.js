const db = require("../models/animeModels");

const animeController = {};

animeController.addFavAnime = (req, res, next) => {
  console.log("IN FAV ANIME");
  const { userId, malId } = req.body;

  const queryString = `INSERT INTO favorites (mal_id) VALUES ($1) RETURNING *`;

  const values = [malId];

  //sends SQL query and values to be passed into SQL user table
  db.query(queryString, values)
    // promise chaining query -> results are the return value of SQL query string
    .then((results) => {
      console.log("Here is the new Favorites: ", results.rows[0]);
      // saving user to locals.newUser so we can output in user's route
      res.locals.favorite = results.rows[0];
      const queryString2 =
        "INSERT INTO favorite_details (favorite_id, user_id, mal_id) VALUES($1,$2,$3) RETURNING *";
      const values2 = [res.locals.favorite.id, userId, malId];
      db.query(queryString2, values2);
      // return next middleware
      return next();
    })
    // error catching
    .catch((err) =>
      next({
        log: "Error in adding row to favorites table",
        message: { err },
      })
    );

  // we thing res.locals.favorites is going to be an object {id: foo, malId: bar}
  // => we can do res.locals.favorites.id to grab favorites id
  //     "user_id" integer NOT NULL,
  //     "favorite_id" integer NOT NULL
  // const queryString2 = 'INSERT INTO favorite_details (favorite_id, user_id, mal_id) VALUES($1,$2,$3) RETURNING *'
  // console.log("favorite id: ",res.locals.favorite.id)
  // const values2 = [res.locals.favorite.id, userId, malId]
  // await db.query(queryString2, values2)
  //     // promise chaining query -> results are the return value of SQL query string
  //     .then(results => {
  //         console.log('Here is the new Favorites details: ', results.rows[0]);
  //         // saving user to locals.newUser so we can output in user's route
  //         // return next middleware
  //         return next();
  //     })
  //     // error catching
  //     .catch((err) => next({
  //       log: 'Error in adding row to favorites_details table',
  //       message: {err},
  //     }));
};

animeController.deleteFavAnime = (req, res, next) => {
  const { userId, malId } = req.body;

  const queryString = `DELETE from favorite_details WHERE mal_id=$1 AND user_id=$2 RETURNING *`;
  const values = [malId, userId];
  db.query(queryString, values)
    // promise chaining query -> results are the return value of SQL query string
    .then((results) => {
      console.log("Deleted row from favorite_details: ", results.rows[0]);
      // saving user to locals.newUser so we can output in user's route
      // return next middleware
      return next();
    })
    // error catching
    .catch((err) =>
      next({
        log: "Error in adding row to favorites_details table",
        message: { err },
      })
    );
};

animeController.checkLiked = (req, res, next) => {
    const { userId, malId } = req.body
    
    const queryString = `SELECT * from favorite_details WHERE mal_id=$1 AND user_id=$2`;
    const values = [malId, userId]
    
    db.query(queryString, values)
        .then(results => {
            console.log("results: ", results)
            if (results.rows.length > 0) {
                console.log('The entry exists in favorite_details: ', results.rows[0]);
                res.locals.isLiked = true;
            } else {
                console.log('The entry does not exist in favorite_details');
                res.locals.isLiked = false;
            }
            // return next middleware
            return next();
        })
        // error catching
        .catch((err) => {
            next({log: 'Error in checking the existence of an entry in the favorite_details table',
            message: {err},
        })})
}
animeController.getLiked = (req, res, next) => {
  const { userId } = req.body
  
  // Change the query to select only mal_id
  const queryString = `SELECT mal_id from favorite_details WHERE user_id=$1`;
  const values = [userId]
  
  db.query(queryString, values)
      .then(results => {
          console.log("results: ", results)
          if (results.rows.length > 0) {
              // Map the rows to get an array of mal_id values
              const malIds = results.rows.map(row => row.mal_id);
              console.log('malId values for user: ', malIds);
              res.locals.ID = malIds;
          } else {
              console.log('The user does not have any entries in favorite_details');
              res.locals.ID = [];
          }
          // return next middleware
          return next();
      })
      // error catching
      .catch((err) => {
          next({log: 'Error in checking the existence of an entry in the favorite_details table',
          message: {err},
      })})
}


module.exports = animeController;
