const BinStateLog = require('../../models/ver1/BinStateLog');

// Create
const addNewBinStateLog = async (req, res) => {
    try {
        let newBinStateLogData = req.body;
        if (
            !newBinStateLogData.latitude ||
            !newBinStateLogData.longitude ||
            !newBinStateLogData.heigth ||
            !newBinStateLogData.weight ||
            !newBinStateLogData.status ||
            !newBinStateLogData.binId
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let newBinStateLog = new BinStateLog({
            latitude: newBinStateLogData.latitude,
            longitude: newBinStateLogData.longitude,
            heigth: newBinStateLogData.heigth,
            weight: newBinStateLogData.weight,
            status: newBinStateLogData.status,
            binId: newBinStateLogData.binId
        });
        let resData = newBinStateLog;
        console.log(resData);
        await newBinStateLog.save();
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
const deleteBinStateLogById = async (req, res) => {
    try {
        let binStateLogId = req.params.binStateLogId;
        let binStateLog = await BinStateLog.findById(binStateLogId).exec();
        if (!binStateLog) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'BinStateLog not found.'
            });
        }
        await BinStateLog.deleteOne({ _id: binStateLogId }).exec();
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: binStateLog
        });
    } catch (err) {
        res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Update
const updateBinStateLogById = async (req, res) => {
    try {
        let binStateLogId = req.params.binStateLogId;
        let binStateLog = await BinStateLog.findById(binStateLogId).exec();
        if (!binStateLog) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'BinStateLog not found.'
            });
        }
        let newBinStateLogData = req.body;
        if (
            !newBinStateLogData.latitude ||
            !newBinStateLogData.longitude ||
            !newBinStateLogData.heigth ||
            !newBinStateLogData.weight ||
            !newBinStateLogData.status
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        await BinStateLog.updateOne(
            { _id: binStateLogId },
            {
                latitude: newBinStateLogData.latitude,
                longitude: newBinStateLogData.longitude,
                heigth: newBinStateLogData.heigth,
                weight: newBinStateLogData.weight,
                status: newBinStateLogData.status
            }
        ).exec();
        let resData = newBinStateLogData;
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
const getAllBinStateLog = async (req, res) => {
    try {
        let binStateLogs = await BinStateLog.find({}).exec();
        if (!binStateLogs) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'BinStateLog not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: binStateLogs
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getBinStateLogById = async (req, res) => {
    try {
        let binStateLogId = req.params.binStateLogId;
        let binStateLog = await BinStateLog.findById(binStateLogId).exec();
        if (!binStateLog) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'BinStateLog not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: binStateLog
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};

module.exports = {
    addNewBinStateLog,
    deleteBinStateLogById,
    updateBinStateLogById,
    getAllBinStateLog,
    getBinStateLogById
};
