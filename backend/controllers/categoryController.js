const categoryModel = require('../models/category');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const getUserId = (accessToken) => {
    const decoded = jwt.verify(accessToken, config.SECRET_ACCESS_KEY);
    return decoded.userId;
}

const addCategory = async(data, accessToken) => {
    
    data.user = getUserId(accessToken);
    console.log(data);
    const isNewCategory = await categoryModel.create(data);
    if(isNewCategory){
        return {status: 200};
    }
};

const getAllCategories = async() => {
    return await categoryModel.find({});
};

const updateCategory = async(data) => {
    const id = data.id;
    delete data.id;
    await categoryModel.findByIdAndUpdate(id, data);
};

const deleteCategory = async(id) => {
    console.log(id);
    await categoryModel.findByIdAndDelete(id);
};

module.exports.addCategory = addCategory;
module.exports.getAllCategories = getAllCategories;
module.exports.updateCategory = updateCategory;
module.exports.deleteCategory = deleteCategory;
