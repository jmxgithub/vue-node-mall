var express = require('express');
var router = express.Router();

let mongoose = require("mongoose");

// 链接数据库
mongoose.connect('mongodb://127.0.0.1:27017/dumall');

mongoose.connection.on("connected", function(){
    console.log("数据库链接 success")
});
mongoose.connection.on("error", function(){
    console.log("数据库链接 fail")
});

mongoose.connection.on("disconnected", function(){
    console.log("数据库链接断开")
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express, 哈哈11111' });
});

module.exports = router;
