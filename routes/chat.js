var express = require('express');
var router = express.Router();
var db = require('../sql')

/* GET chat page. */
router.get('/', function (req, res, next) {
    db.query("select * from comment, user where comment.userid = user.id", function (err, data) {
        if (err) throw err;
        else {
            res.render("chat", { comments: data });
        }
    });
});

module.exports = router;
