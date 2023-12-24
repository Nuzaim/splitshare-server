var express = require('express');
const bodyParser = require("body-parser");
const Users = require("../models/users.js");
const passport = require('passport');

var router = express.Router();

// add a new user
router.post("/register", function(req, res, next) {
  Users.register({ username: req.body.username }, req.body.password, (err, user) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ status: "Registration Successful!", user: user });
      });
    }
  })
});

// login to existing user
router.post("/login", passport.authenticate('local'), function(req, res, next) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({ success: true, status: "You are successfully logged in!" });
})

module.exports = router;
