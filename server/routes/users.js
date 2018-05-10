var express = require('express');
var router = express.Router();
var User = require("../models/users");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// router.get('/test', function(req, res, next) {
//   res.send('respond with a test');
// });

// 登陆
router.post('/login', function(req, res, next) {
  let params = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  User.findOne(params, function(err, doc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      })
    } else {
      if (doc) {
        res.cookie("userId", doc.userId, {
          path: '/',
          maxAge: 1000*60*60
        });
        res.cookie("userName", doc.userName, {
          path: '/',
          maxAge: 1000*60*60
        });
        // req.session.user = doc;
        res.json({
          status: "0",
          msg: "",
          result: {
            userName: doc.userName
          }
        })
      } else {
        res.json({
          status: "1",
          msg: "用户名或密码不正确"
        })
      }
    }
  })
});

// 登出
router.post('/logout', function(req, res, next) {
  res.cookie('userId', "", {
    path: '/',
    maxAge: -1
  });
  res.cookie('userName', "", {
    path: '/',
    maxAge: -1
  });
  res.json({
    status: "0",
    msg: "",
    result: ""
  })
});

// 校验
router.get('/checkLogin', function(req, res, next) {
  if (req.cookies.userId) {
    res.json({
      status: "0",
      msg: "",
      result: {
        userName: req.cookies.userName || ''
      }
    })
  } else {
    res.json({
      status: "1",
      msg: "未登录",
      result: ""
    })
  }
});

// 查询当前用户购物车数据
router.get('/cartList', function(req, res, next) {
  let userId = req.cookies.userId;
  let params = {userId: userId}
  User.findOne(params, function(err, doc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      })
    } else {
      if (doc) {
        res.json({
          status: "0",
          msg: "",
          result: {
            cartList: doc.cartList
          }
        })
      }
    }
  })
})

// 购物车删除
router.post('/cartDel', function(req, res, next) {
  let userId = req.cookies.userId;
  let productId = req.body.productId;
  let params = {
    userId
  }
  User.update(params, {
    $pull: {
      cartList: {
        productId
      }
    }
  }, function(err, doc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message,
        result: ""
      })
    } else {
      res.json({
        status: "0",
        msg: "",
        result: "删除成功！"
      })
    }
  })
});

// 购物车修改商品数量
router.post('/cartEdit', function(req, res, next) {
  let userId = req.cookies.userId;
  let productId = req.body.productId;
  let productNum = req.body.productNum;
  let checked = req.body.checked;
  let params = {
    userId,
    "cartList.productId": productId
  }
  User.update(params, {
    "cartList.$.productNum": productNum,
    "cartList.$.checked": checked
  }, function(err, doc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message,
        result: ""
      })
    } else {
      res.json({
        status: "0",
        msg: "",
        result: "更新成功！"
      })
    }
  })
});

router.post('/editCheckAll', function(req, res, next) {
  let userId = req.cookies.userId;
  let productId = req.body.productId;
  let checkAll = req.body.checkAll ? "1" : "0";
  let params = {
    userId
  }
  User.findOne(params, function(err, user) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message,
        result: ""
      })
    } else {
      if (user) {
        user.cartList.forEach((item) => {
          item.checked = checkAll
        });
        user.save(function(err1, doc) {
          if (err1) {
            res.json({
              status: "1",
              msg: err1.message,
              result: ""
            })
          } else {
            res.json({
              status: "0",
              msg: "",
              result: "更新成功！"
            })
          }
        })
      }
    }
  })
})



module.exports = router;
