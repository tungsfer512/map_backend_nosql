import express from 'express';

import binController from '../../controllers/version1/BinController';

let binRouter = express.Router();

binRouter.post('/add', binController.addNewBin);
binRouter.put('/edit/:id', binController.updateBinById);
binRouter.delete('/delete/:id', binController.deleteBinById);
binRouter.get('/:id', binController.getBinById);
binRouter.get('/', binController.getAllBin);

export default binRouter;
