const Bin = require('../../models/ver1/Bin');
const BinStateLog = require('../../models/ver1/BinStateLog');

// Create
const addNewBin = async (req, res) => {
    try {
        let newBinData = req.body;
        if (
            !newBinData.latitude ||
            !newBinData.longitude ||
            !newBinData.heigth ||
            !newBinData.weight ||
            !newBinData.maxWeight ||
            !newBinData.image ||
            !newBinData.pathId
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let newBin = new Bin({
            latitude: newBinData.latitude,
            longitude: newBinData.longitude,
            heigth: newBinData.heigth,
            weight: newBinData.weight,
            maxWeight: newBinData.maxWeight,
            image: newBinData.image,
            status: newBinData.status,
            pathId: newBinData.pathId
        });
        let resData = newBin;
        await newBin.save();
        delete resData.password;
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
const deleteBinById = async (req, res) => {
    try {
        let binId = req.params.binId;
        let bin = await Bin.findById(binId).exec();
        if (!bin) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Bin not found.'
            });
        }
        await BinStateLog.deleteMany({ binId: binId }).exec();
        await Bin.deleteOne({ _id: binId }).exec();
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: bin
        });
    } catch (err) {
        res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Update
const updateBinById = async (req, res) => {
    try {
        let binId = req.params.binId;
        let bin = await Bin.findById(binId).exec();
        if (!bin) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Bin not found.'
            });
        }
        let newBinData = req.body;
        if (
            !newBinData.latitude ||
            !newBinData.longitude ||
            !newBinData.heigth ||
            !newBinData.weight ||
            !newBinData.maxWeight ||
            !newBinData.image ||
            !newBinData.status ||
            !newBinData.pathId
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        await Bin.updateOne(
            { _id: binId },
            {
                latitude: newBinData.latitude,
                longitude: newBinData.longitude,
                heigth: newBinData.heigth,
                weight: newBinData.weight,
                maxWeight: newBinData.maxWeight,
                image: newBinData.image,
                status: newBinData.status,
                pathId: newBinData.pathId
            }
        ).exec();
        let resData = newBinData;
        delete resData.password;
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
const getAllBin = async (req, res) => {
    try {
        let bins = await Bin.find({}).exec();
        if (!bins) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Bin not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: bins
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getBinById = async (req, res) => {
    try {
        let binId = req.params.binId;
        let bins = await Bin.findById(binId).exec();
        if (!bins) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Bin not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: bins
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};

module.exports = {
    addNewBin,
    deleteBinById,
    updateBinById,
    getAllBin,
    getBinById
};
