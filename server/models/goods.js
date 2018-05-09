var mongoose = require("mongoose");
var Schema = mongoose.Schema; // 图表

var productSchema = new Schema({
    "productId": {type: String},
    "productName": String,
    "salePrice": Number,
    "productImage": String
});

module.exports = mongoose.model("Good", productSchema);