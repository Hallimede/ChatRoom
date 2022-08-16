var express = require('express');
var router = express.Router();
var db = require('../sql');

router.post('/', function(req, res, next) {
    console.log(req.body.newMsg);
    db.query("insert into comment value (?,?,?,?)", [0, userid, req.body.newMsg, time], function(err, data){
        if (err) throw err;
        if (data.length > 0) {
            res.end("Post successfully");
            //todo:执行页面的数据更新
        }
    });
});

module.exports = router;
