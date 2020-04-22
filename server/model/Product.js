const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    productPrice: {
        type: Double,
        required: true,
        min: 3,
        max: 10,
    },
    productDescription: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    productQuantity: {
        type: Integer,
        required: true,
        min: 5,
    },
    productCategory: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    productColour: {
        type : String,
        required : true,
        min : 3,
        max : 100
    },
    productBrand: {
        type : String,
        required : true,
        min : 3,
        max : 255
    },
    productSize: {
        type : String,
        required : true,
        min : 3,
        max : 255
    },
    productImageURL: {
        type : String,
        required : true,
    },
    productWatchers: {
        type : Integer,
        required : true,
        min : 3,
        max : 255
    }

});

module.exports = mongoose.model("Product", productSchema);
