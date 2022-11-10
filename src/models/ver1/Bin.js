const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Bin = new Schema(
    {
        id: ObjectId,
        latitude: Number,
        longitude: Number,
        heigth: Number,
        weight: Number,
        maxWeight: Number,
        image: String,
        status: String,
        pathId: ObjectId
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Bin', Bin);
