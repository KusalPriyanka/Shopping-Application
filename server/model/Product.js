const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    productDescription: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    productCategory: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    productImageURLS: [
        {
            imageURL : {
                type: String,
                required: true
            }
        }
    ],
    productBrand: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    productWatchers: {
        type: Number,
        required: true,
        min: 0
    },
    detailsWithSize: [{
        productSize: {
            type: String,
            required: true,
            min: 3,
            max: 255
        },

        productDetails: [{
            productQuantity: {
                type: Number,
                required: true,
                min: 5,
            },

            productPrice: {
                type: Number,
                required: true,
                min: 0,
            },

            productColour: {
                type: String,
                required: true,
                min: 3,
                max: 100
            },
        }]
    }],
});

module.exports = mongoose.model("Product", productSchema);
