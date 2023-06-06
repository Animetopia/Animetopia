const express = require('express')
const animeController = require('../controllers/animeController')
const router = express.Router();

//addFavorite
router.post('/addFav', animeController.addFavAnime, (req,res) => {
    return res.status(200).json(res.locals.favorite)
})

router.delete('/deleteFav', animeController.deleteFavAnime, (req,res) => {
    return res.status(200).json(res.locals.seasonalAnime)
})




module.exports = router