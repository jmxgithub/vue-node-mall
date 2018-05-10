let express = require('express');
let router = express.Router();

/* GET goods page. */
let Goods = require("../models/goods");
let User = require("../models/users");

// 查询商品列表
router.get('/list', function(req, res, next) {
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

// 加入购物车
router.post('/addCart', function(req, res, next) {
    let userId = "100000077";
    let productId = req.body.productId;
    let params = {
        userId: userId
    }
    User.findOne(params, function(err1, userDoc) {
        if (err1) {
            res.json({
                status: "1",
                msg: err1.message
            })
        } else {
            if (userDoc) {
                let goodsItem = "";
                userDoc.cartList.forEach((item) => {
                    if (item.productId == productId) {
                        goodsItem = item;
                        item.productNum++;
                    }
                });
                if (goodsItem) {
                    userDoc.save(function(err3, doc2) {
                        if (err3) {
                            res.json({
                                status: "1",
                                msg: err3.message
                            })
                        }else {
                            res.json({
                                status: "0",
                                msg: "",
                                result: "success"
                            })
                        }
                    })
                }else {
                    Goods.findOne({productId: productId}, function(err2, doc) {
                        if (err2) {
                            res.json({
                                status: "1",
                                msg: err2.message
                            })
                        }else {
                            if (doc) {
                                doc.productNum = 1;
                                doc.checked = 1;
                                userDoc.cartList.push(doc);
                                userDoc.save(function(err3, doc2) {
                                    if (err3) {
                                        res.json({
                                            status: "1",
                                            msg: err3.message
                                        })
                                    }else {
                                        res.json({
                                            status: "0",
                                            msg: "",
                                            result: "success"
                                        })
                                    }
                                })
                            }
                        }
                    })
                }
                
            }
        }
    })
})

module.exports = router;
