import express from 'express';

import binStateLogController from '../../controllers/version1/BinStateLogController';

let binStateLogRouter = express.Router();

binStateLogRouter.post('/add', binStateLogController.addStateLog);
binStateLogRouter.put('/:id/change', binStateLogController.updateStateLogById);
binStateLogRouter.get('/:id', binStateLogController.getStateLogById);
binStateLogRouter.get('/', binStateLogController.getAllStateLog);

export default binStateLogRouter;
