const taskModel = require('../models/task');
const moment = require('moment');

const addTask = async(data) => {
    await taskModel.create(data);
};

const getAllTasks = async() => {
   return await taskModel.find({isDone: false}).populate('category').populate('priority');
};

const updateTask = async(data) => {
    const id = data.id;
    delete data.id;
    await taskModel.findByIdAndUpdate(id, data);
};

const deleteTask = async(id) => {
    console.log(id);
    await taskModel.findByIdAndDelete(id);
};

const getByDate = () => {

};

const getByCategory = () => {

};

module.exports.addTask = addTask;
module.exports.getAllTasks = getAllTasks;
module.exports.updateTask = updateTask;
module.exports.deleteTask = deleteTask;
