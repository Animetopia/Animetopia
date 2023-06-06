const db = require("../models/animeModels");

const animeController = {}

animeController.addFavAnime = (req, res, next) => {
    console.log('IN FAV ANIME');
    const { userId, malId } = req.body

    const queryString = `INSERT INTO favorites (mal_id) VALUES ($1) RETURNING *`;

    const values = [malId];

    //sends SQL query and values to be passed into SQL user table
    db.query(queryString, values)
        // promise chaining query -> results are the return value of SQL query string
        .then(results => {
            console.log('Here is the new Favorites: ', results.rows[0]);
            // saving user to locals.newUser so we can output in user's route
            res.locals.favorite = results.rows[0];
            // return next middleware
            return next();
        })
        // error catching
        .catch((err) => next({
          log: 'Error in adding row to favorites table',
          message: {err},
        }));
        
        // we thing res.locals.favorites is going to be an object {id: foo, animeId: bar} 
        // => we can do res.locals.favorites.id to grab favorites id
    // const queryString2 = 'INSERT INTO favorite_details ('
}

animeController.deleteFavAnime = (req, res, next) => {
    const { userId, animeId } = req.body

    const queryString = `INSERT INTO users (username, password, account_balance) VALUES ($1, $2, $3) RETURNING *`;
}


module.exports = animeController