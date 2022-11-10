const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BinStateLog = new Schema(
    {
        id: ObjectId,
        weight: Number,
        status: String,
        binId: ObjectId
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('BinStateLog', BinStateLog);
