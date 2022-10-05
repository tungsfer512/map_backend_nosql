import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema(
    {
        id: ObjectId,
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        gender: String,
        dob: Date,
        email: String,
        phone: String,
        image: String,
        role: {
            type: String,
            default: 'EMPLOYEE'
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('User', User);
