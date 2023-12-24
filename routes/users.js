var express = require('express');
const bodyParser = require("body-parser");
const Users = require("../models/users.js");
const passport = require('passport');

var router = express.Router();

router.route('/')
  /* GET users listing. */
  .get(function(req, res, next) {
    res.send('get operation is not supported on /users.');
  })
  // add a new user
  .post(function(req, res, next) {
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

module.exports = router;
