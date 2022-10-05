import userService from '../../services/version1/UserService';

let addNewUser = async (req, res, next) => {
    let newUser = {
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        dob: req.body.dob,
        email: req.body.email,
        phone: req.body.phone,
        image: req.body.image
    };

    if (
        !newUser.username ||
        !newUser.password ||
        !newUser.firstName ||
        !newUser.lastName ||
        !newUser.gender ||
        !newUser.dob ||
        !newUser.email ||
        !newUser.phone
    ) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing inputs value!!!'
        });
    }

    let newUserData = await userService.handleAddUser(newUser);

    if (newUserData.errCode !== 0) {
        return res.status(500).json({
            errCode: newUserData.errCode,
            errMessage: newUserData.errMessage
        });
    }

    return res.status(200).json({
        errCode: newUserData.errCode,
        errMessage: newUserData.errMessage,
        user: newUserData.user
    });
};

let getAllUser = async (req, res, next) => {
    let userData = await userService.handleGetAllUser();

    if (userData.errCode !== 0) {
        return res.status(500).json({
            errCode: userData.errCode,
            errMessage: userData.errMessage
        });
    }

    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        user: userData.user
    });
};

let getUserById = async (req, res, next) => {
    let id = req.params.id;

    let userData = await userService.handleGetUserById(id);

    if (userData.errCode !== 0) {
        return res.status(500).json({
            errCode: userData.errCode,
            errMessage: userData.errMessage
        });
    }

    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        user: userData.user
    });
};

let updateUserById = async (req, res, next) => {
    let id = req.params.id;
    let newInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        dob: req.body.dob,
        email: req.body.email,
        phone: req.body.phone,
        image: req.body.image
    };

    if (
        !newInfo.firstName ||
        !newInfo.lastName ||
        !newInfo.gender ||
        !newInfo.dob ||
        !newInfo.email ||
        !newInfo.phone ||
        !newInfo.image
    ) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing input values'
        });
    }

    let userData = await userService.handleUpdateUserById(id, newInfo);

    if (userData.errCode !== 0) {
        return res.status(500).json({
            errCode: userData.errCode,
            errMessage: userData.errMessage
        });
    }

    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        userBefore: userData.userBefore,
        userAfter: userData.userAfter
    });
};

let deleteUserById = async (req, res, next) => {
    let id = req.params.id;

    let userData = await userService.handleDeleteUserById(id);

    if (userData.errCode !== 0) {
        return res.status(500).json({
            errCode: userData.errCode,
            errMessage: userData.errMessage
        });
    }

    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        user: userData.user
    });
};

export default {
    addNewUser,
    getAllUser,
    getUserById,
    updateUserById,
    deleteUserById
};
