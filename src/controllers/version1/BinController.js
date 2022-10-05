import binService from '../../services/version1/BinService';

let addNewBin = async (req, res, next) => {
    let newBin = {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        height: req.body.height,
        weight: req.body.weight,
        maxWeight: req.body.maxWeight,
        status: req.body.status
    };

    if (
        !newBin.latitude ||
        !newBin.longitude ||
        !newBin.height ||
        !newBin.weight ||
        !newBin.maxWeight ||
        !newBin.status
    ) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing inputs value!!!'
        });
    }

    let newBinData = await binService.handleAddBin(newBin);

    if (newBinData.errCode !== 0) {
        return res.status(500).json({
            errCode: newBinData.errCode,
            errMessage: newBinData.errMessage
        });
    }

    return res.status(200).json({
        errCode: newBinData.errCode,
        errMessage: newBinData.errMessage,
        bin: newBinData.bin
    });
};

let getAllBin = async (req, res, next) => {
    let binsData = await binService.handleGetAllBin();

    if (binsData.errCode !== 0) {
        return res.status(500).json({
            errCode: binsData.errCode,
            errMessage: binsData.errMessage
        });
    }

    return res.status(200).json({
        errCode: binsData.errCode,
        errMessage: binsData.errMessage,
        bins: binsData.bins
    });
};

let getBinById = async (req, res, next) => {
    let id = req.params.id;

    let binData = await binService.handleGetBinById(id);
    if (binData.errCode !== 0) {
        return res.status(500).json({
            errCode: binData.errCode,
            errMessage: binData.errMessage
        });
    }
    return res.status(200).json({
        errCode: binData.errCode,
        errMessage: binData.errMessage,
        bin: binData.bin
    });
};

let updateBinById = async (req, res, next) => {
    let id = req.params.id;
    let newInfo = {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        height: req.body.height,
        weight: req.body.weight,
        maxWeight: req.body.maxWeight,
        status: req.body.status
    };

    if (
        !newInfo.latitude ||
        !newInfo.longitude ||
        !newInfo.height ||
        !newInfo.weight ||
        !newInfo.maxWeight ||
        !newInfo.status
    ) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing input values'
        });
    }

    let binData = await binService.handleUpdateBinById(id, newInfo);
    if (binData.errCode !== 0) {
        return res.status(500).json({
            errCode: binData.errCode,
            errMessage: binData.errMessage
        });
    }
    return res.status(200).json({
        errCode: binData.errCode,
        errMessage: binData.errMessage,
        binBefore: binData.binBefore,
        binAfter: binData.binAfter
    });
};

let deleteBinById = async (req, res, next) => {
    let id = req.params.id;

    let binData = await binService.handleDeleteBinById(id);
    if (binData.errCode !== 0) {
        return res.status(500).json({
            errCode: binData.errCode,
            errMessage: binData.errMessage
        });
    }
    return res.status(200).json({
        errCode: binData.errCode,
        errMessage: binData.errMessage,
        bin: binData.bin
    });
};

export default {
    addNewBin,
    getAllBin,
    getBinById,
    updateBinById,
    deleteBinById
};
