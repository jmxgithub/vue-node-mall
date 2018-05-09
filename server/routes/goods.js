let express = require('express');
let router = express.Router();

/* GET goods page. */
let mongoose = require("mongoose");
let Goods = require("../models/goods");

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

router.get('/', function(req, res, next) {
    let page = parseInt(req.query.page); 
    let pageSize = parseInt(req.query.pageSize);
    let sort = parseInt(req.query.sort); //排序
    let skip = (page - 1) * pageSize; //跳过几条
    let priceLevel = req.query.priceLevel;
    let params = {};
    let priceGt = "";
    let priceLte = "";
    if (priceLevel != 'all') {
        switch (priceLevel) {
            case '0': 
                priceGt = 0;
                priceLte = 500;
                break;
            case '1': 
                priceGt = 500;
                priceLte = 1000;
                break;
            case '2': 
                priceGt = 1000;
                priceLte = 1500;
                break;
            case '3': 
                priceGt = 1500;
                priceLte = 2000;
                break;
        }
        params = {
            salePrice: {
                $gt: priceGt,
                $lte: priceLte
            }
        }
    }
    
    let goodsModel =  Goods.find(params).skip(skip).limit(pageSize);
    goodsModel.sort({"salePrice": sort});
    goodsModel.exec(function(err, doc){
        if (err) {
            res.json({
                status: "1",
                msg: err.message
            })
        } else {
            res.json({
                status: "0",
                msg: "",
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
});

module.exports = router;
