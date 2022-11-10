const User = require('../models/ver1/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        let newUserData = req.body;
        console.log(123);
        if (
            !newUserData.username ||
            !newUserData.password ||
            !newUserData.email ||
            !newUserData.firstName ||
            !newUserData.lastName
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        console.log(234);
        let isEmailExist = await isEmailExisted(newUserData.email);
        console.log(234);
        let isUsernameExist = await isUsernameExisted(newUserData.username);
        // let isEmailExist = false;
        // console.log(234);
        // let isUsernameExist = false;
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
        console.log(456);
        let salt = await bcrypt.genSalt(10);
        newUserData.role = 'driver';
        let encodedPassword = await bcrypt.hash(newUserData.password, salt);
        let newUser = new User({
            role: newUserData.role,
            username: newUserData.username,
            password: encodedPassword,
            email: newUserData.email,
            firstName: newUserData.firstName,
            lastName: newUserData.lastName
        });
        console.log(567);
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
const login = async (req, res) => {
    try {
        let reqUserData = req.body;
        if (!reqUserData.username || !reqUserData.password) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        console.log(123);
        let userData = await User.findOne({
            username: reqUserData.username
        }).exec();
        console.log(123);
        if (!userData) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'User not found.'
            });
        }
        let validPassword = await bcrypt.compare(
            reqUserData.password,
            userData.password
        );
        if (!validPassword) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Wrong password.'
            });
        }
        let resData = userData._doc;
        console.log(userData._doc._id.toString());
        delete resData.password;
        const accessToken = jwt.sign(
            {
                id: userData._doc._id.toString(),
                role: userData.role
            },
            process.env.JWT_ACCESS_KEY,
            {
                expiresIn: '365d'
            }
        );
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: {
                ...resData,
                accessToken: accessToken
            }
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const isUsernameExisted = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = await User.findOne({
                username: username
            }).exec();
            console.log("jkghhj");
            if (userData) {
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
            let userData = await User.findOne({
                email: email
            }).exec();
            if (userData) {
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
    register,
    login
};
