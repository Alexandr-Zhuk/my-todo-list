const taskModel = require('../models/task');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const getUserId = (accessToken) => {
    const decoded = jwt.verify(accessToken, config.SECRET_ACCESS_KEY);
    return decoded.userId;
}


const addTask = async(data, accessToken) => {
    data.user = getUserId(accessToken);
    console.log('Смотрим данные при добавлении задачи --- ', data)
    return await taskModel.create(data);
};

const getAllTasks = async(filter, accessToken) => {
    filter.isDone = false;
    filter.user = getUserId(accessToken);
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