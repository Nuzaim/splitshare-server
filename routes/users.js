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

// logout from the current user
router.get("/logout", function(req, res) {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");
  } else {
    const err = new Error("You are not logged in!");
    err.status = 403
    next(err);
  }
})

module.exports = router;
