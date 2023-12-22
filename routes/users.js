var express = require('express');
const bodyParser = require("body-parser");
const Users = require("../models/users.js");

var router = express.Router();

router.route('/')
  /* GET users listing. */
  .get(function(req, res, next) {
    res.send('get operation is not supported on /users.');
  })
  // add a new user
  .post(function(req, res, next) {
    Users.create(req.body)
      .then((user) => {
        console.log("New user created: ", user);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(user);
      })
      .catch(err => next(err))
  });

module.exports = router;
