const mongoose = require("mongoose");

const BookSchema = mongoose.Schema(
    {
        "isbn": Number,
        "authors": [Number],
        "category": [String],
        "publication": Number,
        "country": String,
        "imageLink": String,
        "language": String,
        "link": String,
        "pages": Number,
        "title": String,
        "year": Number
    }
);

const BookModel = mongoose.model("Books", BookSchema);

module.exports = BookModel;