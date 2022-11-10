const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema(
    {
        id: ObjectId,
        username: String,
        password: String,
        email: String,
        firstName: String,
        lastName: String,
        role: String,
        image: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', User);
