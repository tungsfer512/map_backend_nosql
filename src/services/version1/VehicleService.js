import Vehicle from '../../models/version1/Vehicle';

let handleAddVehicle = (newVehicle) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newVehicleData = {
                errCode: 0,
                errMessage: 'OK',
                vehicle: newVehicle
            };
            let NEWVEHICLE = new Vehicle(newVehicle);
            await NEWVEHICLE.save();
            resolve(newVehicleData);
        } catch (err) {
            reject(err);
        }
    });
};

let handleGetAllVehicle = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let vehiclesData = {};
            let vehicles = await Vehicle.find({});
            vehiclesData.errCode = 0;
            vehiclesData.errMessage = 'OK';
            vehiclesData.vehicles = vehicles;
            resolve(vehiclesData);
        } catch (err) {
            reject(err);
        }
    });
};
let handleGetVehicleById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let vehicleData = {};
            let vehicle = await Vehicle.findById(id).exec();
            if (vehicle) {
                vehicleData.errCode = 0;
                vehicleData.errMessage = 'OK';
                vehicleData.vehicle = vehicle;
            } else {
                vehicleData.errCode = 1;
                vehicleData.errMessage = 'Vehicle Not Found!!!';
            }
            resolve(vehicleData);
        } catch (err) {
            reject(err);
        }
    });
};
let handleUpdateVehicleById = (id, newInfo) => {
    return new Promise(async (resolve, reject) => {
        try {
            let vehicleData = {};
            let vehicle = await Vehicle.findById(id).exec();
            if (vehicle) {
                vehicleData.errCode = 0;
                vehicleData.errMessage = 'Updated';
                vehicleData.vehicleBefore = vehicle;
                await Vehicle.updateOne(
                    { _id: id },
                    {
                        code: newInfo.code,
                        brand: newInfo.brand,
                        name: newInfo.name,
                        licensePlate: newInfo.licensePlate,
                        latitude: newInfo.latitude,
                        longitude: newInfo.longitude,
                        emptyWeight: newInfo.emptyWeight,
                        weight: newInfo.weight,
                        maxWeight: newInfo.maxWeight,
                        height: newInfo.height,
                        width: newInfo.width,
                        length: newInfo.length,
                        speed: newInfo.speed,
                        maxSpeed: newInfo.maxSpeed,
                        image: newInfo.image,
                        status: newInfo.status
                    }
                );
                vehicleData.vehicleAfter = await Vehicle.findById(id).exec();
            } else {
                vehicleData.errCode = 1;
                vehicleData.errMessage = 'Vehicle Not Found!!!';
            }
            resolve(vehicleData);
        } catch (err) {
            reject(err);
        }
    });
};
let handleDeleteVehicleById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let vehicleData = {};
            let vehicle = await Vehicle.findById(id).exec();
            if (vehicle) {
                vehicleData.errCode = 0;
                vehicleData.errMessage = 'Deleted';
                vehicleData.vehicle = vehicle;
                await Vehicle.deleteOne({ _id: id });
            } else {
                vehicleData.errCode = 1;
                vehicleData.errMessage = 'Vehicle Not Found!!!';
            }
            resolve(vehicleData);
        } catch (err) {
            reject(err);
        }
    });
};

export default {
    handleAddVehicle,
    handleGetAllVehicle,
    handleGetVehicleById,
    handleUpdateVehicleById,
    handleDeleteVehicleById
};
