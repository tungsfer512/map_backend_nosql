import User from '../models/version1/User';

let handleUserLogin = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isUsernameExist = await checkUsername(username);
            let userData = {};
            if (isUsernameExist) {
                let user = await User.findOne({ username: username }).exec();
                if (user) {
                    if (user.password === password) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        userData.user = user;
                    } else {
                        userData.errCode = 4;
                        userData.errMessage = 'Wrong password!!!';
                    }
                } else {
                    userData.errCode = 3;
                    userData.errMessage =
                        'username does not exist, please try again!!!';
                }
            } else {
                userData.errCode = 2;
                userData.errMessage =
                    'username does not exist, please try again!!!';
            }
            resolve(userData);
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
            console.log(userData);
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

export default {
    handleUserLogin
};
