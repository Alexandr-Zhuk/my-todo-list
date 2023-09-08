const categoryModel = require('../models/category');

const addCategory = async(data) => {
    console.log(data)
    await categoryModel.create(data);
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
