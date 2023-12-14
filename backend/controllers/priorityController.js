const priorityModel = require('../models/priority');

const addPriority = async(data) => {
    console.log(data)
    await priorityModel.create(data);
};

const getAllPriorities = async() => {
    return await priorityModel.find({});
};

module.exports.addPriority = addPriority;
module.exports.getAllPriorities = getAllPriorities;