const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Task = new Schema(
    {
        id: ObjectId,
        status: String,
        driverId: ObjectId,
        vehicleId: ObjectId,
        pathId: ObjectId
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Task', Task);
