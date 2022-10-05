import vehicleService from '../../services/version1/VehicleService';

let addNewVehicle = async (req, res, next) => {
    let newVehicle = {
        code: req.body.code,
        brand: req.body.brand,
        name: req.body.name,
        licensePlate: req.body.licensePlate,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        emptyWeight: req.body.emptyWeight,
        weight: req.body.weight,
        maxWeight: req.body.maxWeight,
        speed: req.body.speed,
        height: req.body.height,
        width: req.body.width,
        length: req.body.length,
        maxSpeed: req.body.maxSpeed,
        image: req.body.image,
        status: req.body.status
    };

    if (
        !newVehicle.code ||
        !newVehicle.brand ||
        !newVehicle.name ||
        !newVehicle.licensePlate ||
        !newVehicle.latitude ||
        !newVehicle.longitude ||
        !newVehicle.emptyWeight ||
        !newVehicle.weight ||
        !newVehicle.maxWeight ||
        !newVehicle.speed ||
        !newVehicle.height ||
        !newVehicle.width ||
        !newVehicle.length ||
        !newVehicle.maxSpeed ||
        !newVehicle.status
    ) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing inputs value!!!'
        });
    }

    let newVehicleData = await vehicleService.handleAddVehicle(newVehicle);

    if (newVehicleData.errCode !== 0) {
        return res.status(500).json({
            errCode: newVehicleData.errCode,
            errMessage: newVehicleData.errMessage
        });
    }

    return res.status(200).json({
        errCode: newVehicleData.errCode,
        errMessage: newVehicleData.errMessage,
        vehicle: newVehicleData.vehicle
    });
};

let getAllVehicle = async (req, res, next) => {
    let vehiclesData = await vehicleService.handleGetAllVehicle();

    if (vehiclesData.errCode !== 0) {
        return res.status(500).json({
            errCode: vehiclesData.errCode,
            errMessage: vehiclesData.errMessage
        });
    }

    return res.status(200).json({
        errCode: vehiclesData.errCode,
        errMessage: vehiclesData.errMessage,
        vehicles: vehiclesData.vehicles
    });
};

let getVehicleById = async (req, res, next) => {
    let id = req.params.id;

    let vehicleData = await vehicleService.handleGetVehicleById(id);

    if (vehicleData.errCode !== 0) {
        return res.status(500).json({
            errCode: vehicleData.errCode,
            errMessage: vehicleData.errMessage
        });
    }

    return res.status(200).json({
        errCode: vehicleData.errCode,
        errMessage: vehicleData.errMessage,
        vehicle: vehicleData.vehicle
    });
};

let updateVehicleById = async (req, res, next) => {
    let id = req.params.id;
    let newInfo = {
        code: req.body.code,
        brand: req.body.brand,
        name: req.body.name,
        licensePlate: req.body.licensePlate,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        emptyWeight: req.body.emptyWeight,
        weight: req.body.weight,
        maxWeight: req.body.maxWeight,
        height: req.body.height,
        width: req.body.width,
        length: req.body.length,
        speed: req.body.speed,
        maxSpeed: req.body.maxSpeed,
        image: req.body.image,
        status: req.body.status
    };

    if (
        !newInfo.code ||
        !newInfo.brand ||
        !newInfo.name ||
        !newInfo.licensePlate ||
        !newInfo.latitude ||
        !newInfo.longitude ||
        !newInfo.emptyWeight ||
        !newInfo.weight ||
        !newInfo.maxWeight ||
        !newInfo.height ||
        !newInfo.width ||
        !newInfo.length ||
        !newInfo.speed ||
        !newInfo.maxSpeed ||
        !newInfo.status
    ) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing input values'
        });
    }

    let vehicleData = await vehicleService.handleUpdateVehicleById(id, newInfo);

    if (vehicleData.errCode !== 0) {
        return res.status(500).json({
            errCode: vehicleData.errCode,
            errMessage: vehicleData.errMessage
        });
    }

    return res.status(200).json({
        errCode: vehicleData.errCode,
        errMessage: vehicleData.errMessage,
        vehicleBefore: vehicleData.vehicleBefore,
        vehicleAfter: vehicleData.vehicleAfter
    });
};

let deleteVehicleById = async (req, res, next) => {
    let id = req.params.id;

    let vehicleData = await vehicleService.handleDeleteVehicleById(id);

    if (vehicleData.errCode !== 0) {
        return res.status(500).json({
            errCode: vehicleData.errCode,
            errMessage: vehicleData.errMessage
        });
    }
    return res.status(200).json({
        errCode: vehicleData.errCode,
        errMessage: vehicleData.errMessage,
        vehicle: vehicleData.vehicle
    });
};

export default {
    addNewVehicle,
    getAllVehicle,
    getVehicleById,
    updateVehicleById,
    deleteVehicleById
};
