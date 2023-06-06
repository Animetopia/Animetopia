const express = require('express')
const animeController = require('../controllers/animeController')
const router = express.Router();

router.get('/seasons', animeController.getSeasonalAnime, (req,res) => {
    return res.status(200).json(res.locals.seasonalAnime)
})




module.exports = router