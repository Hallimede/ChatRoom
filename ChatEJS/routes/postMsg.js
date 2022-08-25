var express = require('express');
var router = express.Router();
var db = require('../sql');

router.post('/', function (req, res, next) {
    console.log(req.body.newMsg);
    console.log(req.cookies.userId);

    Date.prototype.format = function (format) {

        var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "h+": this.getHours(), //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
        }
        var ampm = "AM";
        if (o["h+"] > 12) {
            o["h+"] -= 12;
            ampm = "PM";
        }
        if (o["h+"] == 0) {
            o["h+"] += 12;
        }
        if (o["h+"] == 12) {
            ampm = "PM";
        }

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));

        format += ampm;
        return format;
    }

    var date = new Date().format('MM.dd.yyyy hh:mm');
    console.log(date);

    db.query("insert into comment value (?,?,?,?)", [0, req.cookies.userId, req.body.newMsg, date], function (err, data) {
        if (err) throw err;
        db.query("select * from comment, user where comment.userid = user.id", function (err, data) {
            if (err) throw err;
            else {
                res.render("chat", { comments: data });
            }
        });
    });
});

module.exports = router;
