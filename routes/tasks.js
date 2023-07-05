const express = require('express');
const Ajv = require('ajv');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const taskController = require('../controllers/taskController');

const ajv = new Ajv();

const pathUp = path.join(__dirname + '/../public/uploads');
const upload = multer({dest: pathUp});

router.get('/', (req, res) => {
    res.render('tasks');
});

router.get('/list', async(req, res) => {
    const taskList = await taskController.getAllTasks();
    res.json(taskList);
});

router.post('/add', upload.none(), async(req, res) => {
    const newTask = req.body;
    console.log(newTask);
    await taskController.addTask(newTask);
    const taskList = await taskController.getAllTasks();
    res.json(taskList);
});


module.exports = router;