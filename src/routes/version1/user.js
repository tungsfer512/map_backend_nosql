import express from 'express';

import userController from '../../controllers/version1/UserController';

let userRouter = express.Router();

userRouter.post('/add', userController.addNewUser);
userRouter.put('/edit/:id', userController.updateUserById);
userRouter.delete('/delete/:id', userController.deleteUserById);
userRouter.get('/:id', userController.getUserById);
userRouter.get('/', userController.getAllUser);

export default userRouter;
