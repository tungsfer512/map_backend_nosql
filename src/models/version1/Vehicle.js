import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Vehicle = new Schema(
    {
        id: ObjectId,
        code: String,
        brand: String,
        name: String,
        licensePlate: String,
        latitude: Number,
        longitude: Number,
        emptyWeight: Number,
        weight: Number,
        maxWeight: Number,
        height: Number,
        width: Number,
        length: Number,
        speed: Number,
        maxSpeed: Number,
        image: String,
        status: String
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Vehicle', Vehicle);
