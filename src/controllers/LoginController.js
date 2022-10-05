import loginService from '../services/LoginService';

let userLogin = async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    if (!username || !password) {
        return res.status(500).json({
            errCode: 1,
            errMesssage: 'Missing input parameters'
        });
    }

    let userData = await loginService.handleUserLogin(username, password);

    return res.status(200).json({
        errCode: userData.errCode,
        errMesssage: userData.errMessage,
        userData: userData.user ? userData.user : {}
    });
};

export default {
    userLogin
};
