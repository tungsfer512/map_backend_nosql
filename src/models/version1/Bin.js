import mongoose from 'mongoose';

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
        status: String
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Bin', Bin);
