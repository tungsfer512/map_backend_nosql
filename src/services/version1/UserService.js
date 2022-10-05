import User from '../../models/version1/User';

let handleAddUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isUsernameExist = await checkUsername(newUser.username);
            let isEmailUsed = await checkEmail(newUser.email);
            let isPhoneUsed = await checkPhone(newUser.phone);
            let newUserData = {};
            if (isUsernameExist) {
                newUserData.errCode = 2;
                newUserData.errMessage =
                    'User already exists, please choose another one!!!';
            } else if (isPhoneUsed) {
                newUserData.errCode = 3;
                newUserData.errMessage =
                    'Phone number already in use, please choose another one!!!';
            } else if (isEmailUsed) {
                newUserData.errCode = 4;
                newUserData.errMessage =
                    'Email already in use, please choose another one!!!';
            } else {
                newUserData.errCode = 0;
                newUserData.errMessage = 'OK';
                let NEWUSER = new User(newUser);
                await NEWUSER.save();
                newUserData.user = newUser;
                delete newUserData.user.password;
            }
            resolve(newUserData);
        } catch (err) {
            reject(err);
        }
    });
};

let checkUsername = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = await User.findOne({
                username: username
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
let checkEmail = (email) => {
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
let checkPhone = (phone) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = await User.findOne({
                phone: phone
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

let handleGetAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let user = await User.find({});
            userData.errCode = 0;
            userData.errMessage = 'OK';
            userData.user = user;
            resolve(userData);
        } catch (err) {
            reject(err);
        }
    });
};
let handleGetUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let user = await User.findById(id).exec();
            if (user) {
                userData.errCode = 0;
                userData.errMessage = 'OK';
                userData.user = user;
            } else {
                userData.errCode = 1;
                userData.errMessage = 'User Not Found!!!';
            }
            resolve(userData);
        } catch (err) {
            reject(err);
        }
    });
};
let handleUpdateUserById = (id, newInfo) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let user = await User.findById(id).exec();
            if (user) {
                userData.errCode = 0;
                userData.errMessage = 'Updated';
                userData.userBefore = user;
                await User.updateOne(
                    { _id: id },
                    {
                        firstName: newInfo.firstName,
                        lastName: newInfo.lastName,
                        gender: newInfo.gender,
                        dob: newInfo.dob,
                        email: newInfo.email,
                        phone: newInfo.phone,
                        image: newInfo.image
                    }
                );
                userData.userAfter = await User.findById(id).exec();
            } else {
                userData.errCode = 1;
                userData.errMessage = 'User Not Found!!!';
            }
            resolve(userData);
        } catch (err) {
            reject(err);
        }
    });
};
let handleDeleteUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let user = await User.findById(id).exec();
            if (user) {
                userData.errCode = 0;
                userData.errMessage = 'Deleted';
                userData.user = user;
                await User.deleteOne({ _id: id });
            } else {
                userData.errCode = 1;
                userData.errMessage = 'User Not Found!!!';
            }
            resolve(userData);
        } catch (err) {
            reject(err);
        }
    });
};

export default {
    handleAddUser,
    handleGetAllUser,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById
};
