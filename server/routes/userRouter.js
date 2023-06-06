const express = require('express');

const usersController = require('../controllers/usersController');

const router = express.Router();


router.post('/signup', usersController.signUp, (req, res) => {
    return res.status(201).json(res.locals.newUser);
  });