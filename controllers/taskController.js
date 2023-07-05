const taskModel = require('../models/task');

const addTask = async(data) => {
    await taskModel.create(data);
};

const getAllTasks = async() => {
    return await taskModel.find({});
};

const changeTask = async(id) => {

};

const getByDate = () => {

};

const getByCategory = () => {

};

module.exports.addTask = addTask;
module.exports.getAllTasks = getAllTasks;
