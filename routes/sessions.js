const express = require("express");
const Sessions = require("../models/sessions.js");

const router = express.Router();

router.route('/')
  // add a new event or session
  .post(function(req, res, next) {
    Sessions.create(req.body)
      .then((session) => {
        console.log("Session Created", session);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(session);
      })
      .catch(err => next(err))
  });

module.exports = router;
