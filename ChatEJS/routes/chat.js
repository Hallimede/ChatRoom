var express = require('express');
var router = express.Router();
var db = require('../sql')

/* GET chat page. */
router.get('/', function(req, res, next) {

  db.query("select * from comment, user where comment.userid = user.id", function(err, data){
    if (err) throw err;
    else{
        res.render("chat",{comments:data});
    }
});
});

router.post('/login', function(req, res, next) {
    var val = req.body;
    var username = val.username;
    var password = val.password;

    db.query("select * from user where username=? and password=?", [username, password], function(err, data){
        if (err) throw err;
        if (data.length > 0) {
            // res.writeHead(200, { "Content-Type": "text/html;charset=utf8" });
            res.render('chat');
            // res.end("Login Successfully!");
        }
        else{
            res.end("Login failed");
        }
    });
});

router.post('/register', function(req, res, next) {
    db.query("insert into user value (?,?,?)", [0, username, password], function(err, data){
        if (err) throw err;
        res.write("Register successfully!")
        res.end();
    });
});

module.exports = router;
