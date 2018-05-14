var mongoose = require("mongoose");
var Schema = mongoose.Schema; // 图表

var usersSchema = new Schema({
    "userId": {type: String},
    "userName": String,
    "userPwd": String,
    "orderList": Array,
    "cartList": [
        {
            "productId": String,
            "productNum": String,
            "productImage": String,
            "salePrice": String,
            "productName": String,
            "checked": String,
        }
    ],
    "addressList": [
        {
            "addressId": String,
            "userName": String,
            "streetName": String,
            "postCode": Number,
            "tel": String,
            "isDefault": Boolean,
        }
    ]
});

module.exports = mongoose.model("User", usersSchema);