binRouter.post('/states/log', binController.addStateLog);
binRouter.put('/states/:id/change', binController.updateStateLogById);
binRouter.get('/states/:id', binController.getStateLogById);
binRouter.get('/states', binController.getAllStateLog);
