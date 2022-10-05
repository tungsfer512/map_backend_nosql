import express from 'express';
import binRouter from './bin';
import userRouter from './user';
import vehicleRouter from './vehicle';

let version1Router = express.Router();

version1Router.use('/users', userRouter);
version1Router.use('/bins', binRouter);
version1Router.use('/vehicles', vehicleRouter);

export default version1Router;
