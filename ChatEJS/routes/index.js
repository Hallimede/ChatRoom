var express = require('express');
var router = express.Router();
var db = require('../sql')

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', {
    title: 'Express',
    msg: "Welcome to Me New Express",
    arr: [0,2,3]
  });
});

router.post('/')

module.exports = router;
