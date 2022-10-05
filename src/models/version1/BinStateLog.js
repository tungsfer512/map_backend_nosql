import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BinStateLog = new Schema(
    {
        id: ObjectId,
        binId: ObjectId,
        binWeight: Number,
        stateType: String,
        status: String
    },
    {
        timestamps: true
    }
);

export default mongoose.model('BinStateLog', BinStateLog);
