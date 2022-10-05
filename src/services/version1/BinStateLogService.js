import BinStateLog from '../../models/version1/BinStateLog';

let handleAddStateLog = (newState) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newStateLogData = {};
            newStateLogData.errCode = 0;
            newStateLogData.errMessage = 'OK';
            newStateLogData.state = newState;
            let BINSTATE = new BinStateLog(newState);
            await BINSTATE.save();
            resolve(newStateLogData);
        } catch (err) {
            reject(err);
        }
    });
};

let handleGetAllStateLog = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let stateLogsData = {};
            stateLogsData.errCode = 0;
            stateLogsData.errMessage = 'OK';
            stateLogsData.states = await BinStateLog.find({});
            resolve(stateLogsData);
        } catch (err) {
            reject(err);
        }
    });
};

let handleGetStateLogById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let stateLogData = {};
            let state = await BinStateLog.findById(id).exec();
            if (state) {
                stateLogData.errCode = 0;
                stateLogData.errMessage = 'OK';
                stateLogData.state = state;
            } else {
                stateLogData.errCode = 1;
                stateLogData.errMessage = 'Bin State Log Not Found!!!';
            }
            resolve(stateLogData);
        } catch (err) {
            reject(err);
        }
    });
};

let handleUpdateStateLogById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let stateLogData = {};
            let state = await BinStateLog.findById(id).exec();
            if (state) {
                stateLogData.errCode = 0;
                stateLogData.errMessage = 'Updated!!!';
                stateLogData.stateBefore = state;
                await BinStateLog.updateOne(
                    { _id: id },
                    {
                        status: 'solved'
                    }
                );
                stateLogData.stateAfter = await BinStateLog.findById(id).exec();
            } else {
                stateLogData.errCode = 1;
                stateLogData.errMessage = 'Bin State Log Not Found!!!';
            }
            resolve(stateLogData);
        } catch (err) {
            reject(err);
        }
    });
};


export default {
    handleAddStateLog, 
    handleGetAllStateLog, 
    handleGetStateLogById, 
    handleUpdateStateLogById
}