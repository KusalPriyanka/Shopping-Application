const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    CategoryName: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    categoryImageURL: {
        type: String,
        required: true
    },
    categoryDescription: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
});

module.exports = mongoose.model("Categories", CategorySchema);
