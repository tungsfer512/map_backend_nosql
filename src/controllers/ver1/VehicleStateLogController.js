const VehicleStateLog = require('../../models/ver1/VehicleStateLog');

// Create
const addNewVehicleStateLog = async (req, res) => {
    try {
        let newVehicleStateLogData = req.body;
        if (
            !newVehicleStateLogData.latitude ||
            !newVehicleStateLogData.longitude ||
            !newVehicleStateLogData.heigth ||
            !newVehicleStateLogData.weight ||
            !newVehicleStateLogData.altitude ||
            !newVehicleStateLogData.speed ||
            !newVehicleStateLogData.angle ||
            !newVehicleStateLogData.odometer ||
            !newVehicleStateLogData.status
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let newVehicleStateLog = new VehicleStateLog({
            latitude: newVehicleStateLogData.latitude,
            longitude: newVehicleStateLogData.longitude,
            heigth: newVehicleStateLogData.heigth,
            weight: newVehicleStateLogData.weight,
            altitude: newVehicleStateLogData.altitude,
            speed: newVehicleStateLogData.speed,
            angle: newVehicleStateLogData.angle,
            odometer: newVehicleStateLogData.odometer,
            status: newVehicleStateLogData.status
        });
        let resData = newVehicleStateLog;
        await newVehicleStateLog.save();
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: resData
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Delete
const deleteVehicleStateLogById = async (req, res) => {
    try {
        let vehicleStateLogId = req.params.vehicleStateLogId;
        let vehicleStateLog = await VehicleStateLog.findById(
            vehicleStateLogId
        ).exec();
        if (!vehicleStateLog) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'VehicleStateLog not found.'
            });
        }
        await VehicleStateLog.deleteOne({ _id: vehicleStateLogId }).exec();
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: vehicleStateLog
        });
    } catch (err) {
        res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Update
const updateVehicleStateLogById = async (req, res) => {
    try {
        let vehicleStateLogId = req.params.vehicleStateLogId;
        let vehicleStateLog = await VehicleStateLog.findById(
            vehicleStateLogId
        ).exec();
        if (!vehicleStateLog) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'VehicleStateLog not found.'
            });
        }
        let newVehicleStateLogData = req.body;
        if (
            !newVehicleStateLogData.latitude ||
            !newVehicleStateLogData.longitude ||
            !newVehicleStateLogData.heigth ||
            !newVehicleStateLogData.weight ||
            !newVehicleStateLogData.altitude ||
            !newVehicleStateLogData.speed ||
            !newVehicleStateLogData.angle ||
            !newVehicleStateLogData.odometer ||
            !newVehicleStateLogData.status
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        await VehicleStateLog.updateOne(
            { _id: vehicleStateLogId },
            {
                latitude: newVehicleStateLogData.latitude,
                longitude: newVehicleStateLogData.longitude,
                heigth: newVehicleStateLogData.heigth,
                weight: newVehicleStateLogData.weight,
                altitude: newVehicleStateLogData.altitude,
                speed: newVehicleStateLogData.speed,
                angle: newVehicleStateLogData.angle,
                odometer: newVehicleStateLogData.odometer,
                status: newVehicleStateLogData.status
            }
        ).exec();
        let resData = newVehicleStateLogData;
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: resData
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Read
const getAllVehicleStateLog = async (req, res) => {
    try {
        let vehicleStateLog = await VehicleStateLog.find({}).exec();
        if (!vehicleStateLog) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'VehicleStateLog not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: vehicleStateLog
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getVehicleStateLogById = async (req, res) => {
    try {
        let vehicleStateLogId = req.params.vehicleStateLogId;
        let vehicleStateLog = await VehicleStateLog.findById(
            vehicleStateLogId
        ).exec();
        if (!vehicleStateLog) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'VehicleStateLog not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: vehicleStateLog
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};

module.exports = {
    addNewVehicleStateLog,
    deleteVehicleStateLogById,
    updateVehicleStateLogById,
    getAllVehicleStateLog,
    getVehicleStateLogById
};
