var express = require('express');
var router = express.Router();
var db = require('../sql')

/* GET login page. */
router.get('/', function (req, res, next) {
    res.render('login');
});

router.post('/login', function (req, res, next) {
    var val = req.body;
    var username = val.username;
    var password = val.password;

    db.query("select * from user where username=? and password=?", [username, password], function (err, data) {
        if (err) throw err;
        if (data.length > 0) {
            res.cookie("userId", data[0].id, { maxAge: 20000, httpOnly: true })
            res.cookie("userName", username);
            res.redirect('/chat');
        }
        else {
            res.end("Login failed");
        }
    });
});

router.post('/register', function (req, res, next) {
    var val = req.body;
    var username = val.username;
    console.log("username:" + username);
    var password = val.password;
    console.log("password:" + password);
    db.query("insert into user value (?,?,?)", [0, username, password], function (err, data) {
        if (err) throw err;
        res.redirect('/login');
        // res.write("Register successfully!")
        // res.end();
    });
});

module.exports = router;
