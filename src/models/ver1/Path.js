const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Path = new Schema(
    {
        id: ObjectId,
        start: String,
        end: String,
        description: String,
        status: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Path', Path);
