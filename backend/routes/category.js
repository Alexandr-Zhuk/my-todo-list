const express = require('express');
const Ajv = require('ajv');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const categoryController = require('../controllers/categoryController');


const ajv = new Ajv();

const pathUp = path.join(__dirname + '/../public/uploads');
const upload = multer({dest: pathUp});

// /category/list
router.get('/list', async(req, res) => {
    const categoryList = await categoryController.getAllCategories();
    res.json(categoryList);
});

// /category/change
router.post('/change',  async(req, res) => {
    const data = req.body;
    console.log(data);
    await categoryController.updateCategory(data);
    const categoryList = await categoryController.getAllCategories();
    res.json(categoryList);
});

// /category/delete
router.post('/delete', async(req, res) => {
    const id = req.body.id;
    await categoryController.deleteCategory(id);
    const categoryList = await categoryController.getAllCategories();
    res.json(categoryList);
});

// /category/add
router.post('/add', upload.none(), async(req, res) => {
    const newCategory = req.body;
    const authorization = req.headers.authorization;
    const accessToken = authorization.split(' ')[1];

    console.log(newCategory);
    console.log(accessToken);
    const result = await categoryController.addCategory(newCategory, accessToken);
    //const categoryList = await categoryController.getAllCategories();
    res.json(result);
});


module.exports = router;