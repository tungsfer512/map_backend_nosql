const User = require('../../models/ver1/User');
const Task = require('../../models/ver1/Task');
const bcrypt = require('bcrypt');

// Create
const addNewDriver = async (req, res) => {
    try {
        let newDriverData = req.body;
        console.log(newDriverData);
        if (
            !newDriverData.username ||
            !newDriverData.password ||
            !newDriverData.email ||
            !newDriverData.firstName ||
            !newDriverData.lastName
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let isEmailExist = await isEmailExisted(newDriverData.email);
        let isUsernameExist = await isUsernameExisted(newDriverData.username);
        if (isUsernameExist) {
            return res.status(400).json({
                resCode: 400,
                resMessage:
                    'Username already existed, please choose another name.'
            });
        }
        if (isEmailExist) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Email already used, please choose another email.'
            });
        }
        let salt = await bcrypt.genSalt(10);
        newDriverData.role = 'driver';
        let encodedPassword = await bcrypt.hash(newDriverData.password, salt);
        let newUser = new User({
            role: newDriverData.role,
            username: newDriverData.username,
            password: encodedPassword,
            email: newDriverData.email,
            firstName: newDriverData.firstName,
            lastName: newDriverData.lastName
        });
        await newUser.save();
        delete newUser.password;
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: newUser
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Delete
const deleteDriverById = async (req, res) => {
    try {
        let driverId = req.params.driverId;
        let driver = await User.findById(driverId).exec();
        if (!driver) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'User not found.'
            });
        }
        await Task.updateMany(
            { driverId: driverId },
            {
                driverId: ''
            }
        ).exec();
        await User.deleteOne({ _id: driverId }).exec();
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: driver
        });
    } catch (err) {
        res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Update
const updateDriverById = async (req, res) => {
    try {
        let driverId = req.params.driverId;
        let driver = await User.findById(driverId).exec();
        if (!driver) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'User not found.'
            });
        }
        let newDriverData = req.body;
        if (
            !newDriverData.password ||
            !newDriverData.firstName ||
            !newDriverData.lastName
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let salt = await bcrypt.genSalt(10);
        let encodedPassword = await bcrypt.hash(newDriverData.password, salt);
        await User.updateOne(
            { _id: driverId },
            {
                password: encodedPassword,
                firstName: newDriverData.firstName,
                lastName: newDriverData.lastName
            }
        ).exec();
        let resData = newDriverData;
        delete resData.password;
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: resData
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Read
const getAllDriver = async (req, res) => {
    try {
        let drivers = await User.find({}).exec();
        if (!drivers) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'User not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: drivers
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getDriverById = async (req, res) => {
    try {
        let driverId = req.params.driverId;
        let drivers = await User.findById(driverId).exec();
        if (!drivers) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'User not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: drivers
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Validate
const isUsernameExisted = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findOne({
                username: username
            }).exec();
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (err) {
            reject(err);
        }
    });
};
const isEmailExisted = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findOne({
                email: email
            }).exec();
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (err) {
            reject(err);
        }
    });
};
module.exports = {
    addNewDriver,
    deleteDriverById,
    updateDriverById,
    getAllDriver,
    getDriverById
};
