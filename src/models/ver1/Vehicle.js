const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Vehicle = new Schema(
    {
        id: ObjectId,
        latitude: Number,
        longitude: Number,
        heigth: Number,
        weight: Number,
        maxWeight: Number,
        altitude: Number,
        emptyWeight: Number,
        width: Number,
        length: Number,
        speed: Number,
        maxSpeed: Number,
        angle: Number,
        odometer: Number,
        code: String,
        brand: String,
        name: String,
        licensePlate: String,
        image: String,
        status: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Vehicle', Vehicle);
