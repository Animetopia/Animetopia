const express = require('express')
const animeController = require('../controllers/animeController')
const router = express.Router();

//addFavorite
router.post('/addFavAnime', animeController.addFavAnime, (req,res) => {
    return res.status(200).json(res.locals.favorite)
})

router.delete('/deleteFavAnime', animeController.deleteFavAnime, (req,res) => {
    return res.status(200).json(res.locals.seasonalAnime)
})

router.get("/getLiked", animeController.checkLiked, (req,res) => {
    return res.status(200).json(res.locals.isLiked)
})



module.exports = router