const Task = require('../../models/ver1/Task');

// Create
const addNewTask = async (req, res) => {
    try {
        let newTaskData = req.body;
        if (
            !newTaskData.userId ||
            !newTaskData.vehicleId ||
            !newTaskData.pathId
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let newTask = new Task({
            userId: newTaskData.userId,
            vehicleId: newTaskData.vehicleId,
            pathId: newTaskData.pathId,
            status: newTaskData.status
        });
        let resData = newTask;
        await newTask.save();
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
const deleteTaskById = async (req, res) => {
    try {
        let taskId = req.params.taskId;
        let task = await Task.findById(taskId).exec();
        if (!task) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Task not found.'
            });
        }
        await Task.deleteOne({ _id: taskId }).exec();
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: task
        });
    } catch (err) {
        res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Update
const updateTaskById = async (req, res) => {
    try {
        let taskId = req.params.taskId;
        let task = await Task.findById(taskId).exec();
        if (!task) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Task not found.'
            });
        }
        let newTaskData = req.body;
        if (
            !newTaskData.userId ||
            !newTaskData.vehicleId ||
            !newTaskData.pathId
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        await Task.updateOne(
            { _id: taskId },
            {
                userId: newTaskData.userId,
                vehicleId: newTaskData.vehicleId,
                pathId: newTaskData.pathId,
                status: newTaskData.status
            }
        ).exec();
        let resData = newTaskData;
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
const getAllTask = async (req, res) => {
    try {
        let tasks = await Task.find({}).exec();
        if (!tasks) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Task not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: tasks
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getTaskById = async (req, res) => {
    try {
        let taskId = req.params.taskId;
        let task = await Task.findById(taskId).exec();
        if (!task) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Task not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: task
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};

module.exports = {
    addNewTask,
    deleteTaskById,
    updateTaskById,
    getAllTask,
    getTaskById
};
