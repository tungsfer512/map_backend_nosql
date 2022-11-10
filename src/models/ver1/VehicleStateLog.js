const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const VehicleStateLog = new Schema(
    {
        id: ObjectId,
        latitude: Number,
        longitude: Number,
        heigth: Number,
        weight: Number,
        altitude: Number,
        speed: Number,
        angle: Number,
        odometer: Number,
        status: String,
        vehicleId: ObjectId
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('VehicleStateLog', VehicleStateLog);
