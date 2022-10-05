import express from 'express';
import vehicleController from '../../controllers/version1/VehicleController';

let vehicleRouter = express.Router();

vehicleRouter.post('/add', vehicleController.addNewVehicle);
vehicleRouter.put('/edit/:id', vehicleController.updateVehicleById);
vehicleRouter.delete('/delete/:id', vehicleController.deleteVehicleById);
vehicleRouter.get('/:id', vehicleController.getVehicleById);
vehicleRouter.get('/', vehicleController.getAllVehicle);

export default vehicleRouter;
