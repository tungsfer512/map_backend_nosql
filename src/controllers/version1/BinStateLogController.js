import binStateLogService from '../../services/version1/BinStateLogService';

let addStateLog = async (req, res, next) => {
    let newState = {
        binId: req.body.binId,
        binWeight: req.body.binWeight,
        stateType: req.body.stateType,
        status: req.body.status
    };
    if (
        !newState.binId ||
        !newState.binWeight ||
        !newState.stateType ||
        !newState.status
    ) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing input values!!!'
        });
    }

    let newStateData = await binStateLogService.handleAddStateLog(newState);

    if (newStateData.errCode !== 0) {
        return res.status(500).json({
            errCode: newStateData.errCode,
            errMessage: newStateData.errMessage
        });
    }

    return res.status(200).json({
        errCode: newStateData.errCode,
        errMessage: newStateData.errMessage,
        state: newStateData.state
    });
};

let getAllStateLog = async (req, res, next) => {
    let stateLogsData = await binStateLogService.handleGetAllStateLog();

    if (stateLogsData.errCode !== 0) {
        return res.status(500).json({
            errCode: stateLogsData.errCode,
            errMessage: stateLogsData.errMessage
        });
    }

    return res.status(200).json({
        errCode: stateLogsData.errCode,
        errMessage: stateLogsData.errMessage,
        states: stateLogsData.states
    });
};

let getStateLogById = async (req, res, next) => {
    let id = req.params.id;

    let stateLogData = await binStateLogService.handleGetStateLogById(id);

    if (stateLogData.errCode !== 0) {
        return res.status(500).json({
            errCode: stateLogData.errCode,
            errMessage: stateLogData.errMessage
        });
    }

    return res.status(200).json({
        errCode: stateLogData.errCode,
        errMessage: stateLogData.errMessage,
        state: stateLogData.state
    });
};

let updateStateLogById = async (req, res, next) => {
    let id = req.params.id;

    let stateLogData = await binStateLogService.handleUpdateStateLogById(id);

    if (stateLogData.errCode !== 0) {
        return res.status(500).json({
            errCode: stateLogData.errCode,
            errMessage: stateLogData.errMessage
        });
    }

    return res.status(200).json({
        errCode: stateLogData.errCode,
        errMessage: stateLogData.errMessage,
        stateBefore: stateLogData.stateBefore,
        stateAfter: stateLogData.stateAfter
    });
};

export default {
    addStateLog,
    getAllStateLog,
    getStateLogById,
    updateStateLogById
};
