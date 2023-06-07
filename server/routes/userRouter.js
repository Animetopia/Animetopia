const express = require("express");

const usersController = require("../controllers/usersController");

const router = express.Router();

router.post("/signup", usersController.signUp, (req, res) => {
  return res.status(201).json(res.locals.newUser);
});

router.post("/login", usersController.login, (req, res) => {
  return res.status(200).json(res.locals.currUser);
});

router.post("/checkDesc", usersController.checkDescription, (req, res) => {
  return res.status(200).json(res.locals.user_description);
});
router.post("/saveDesc", usersController.saveDescription, (req, res) => {
  return res.status(200).json(res.locals.savedMessage);
});
module.exports = router;
