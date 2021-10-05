const mongoose = require("mongoose");

const PublicationSchema = mongoose.Schema(
    {
        "id": Number,
        "name": String,
        "books": [Number]
    }
);

const PublicationModel = mongoose.model("Publications", PublicationSchema);

module.exports = PublicationModel;