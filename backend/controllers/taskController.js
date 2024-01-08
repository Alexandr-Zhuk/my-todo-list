const taskModel = require('../models/task');


const addTask = async(data) => {
    return await taskModel.create(data);
};

const getAllTasks = async(filter) => {
    filter.isDone = false;
    console.log(filter)
    return await taskModel.find(filter).populate('category').populate('priority');
};

const updateTask = async(data) => {
    const id = data.id;
    delete data.id;
    return await taskModel.findByIdAndUpdate(id, data);
};

const deleteTask = async(id) => {
    console.log(id);
    return await taskModel.findByIdAndDelete(id);
};

const getByDate = () => {

};

const getByCategory = () => {

};

module.exports.addTask = addTask;
module.exports.getAllTasks = getAllTasks;
module.exports.updateTask = updateTask;
module.exports.deleteTask = deleteTask;