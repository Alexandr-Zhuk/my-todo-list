const express = require('express');
const Ajv = require('ajv');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const moment = require('moment');
const taskController = require('../controllers/taskController');

const ajv = new Ajv();

const pathUp = path.join(__dirname + '/../public/uploads');
const upload = multer({dest: pathUp});

router.get('/', (req, res) => {
    res.render('tasks');
});

const filters = ['category', 'date', 'priority'];
const filtrationGetParams = (getParams) => {
    filters.forEach((item) => {
        if(Object.keys(getParams).includes(item)){
            const cleanVal = getParams[item].replaceAll(/[<, /, >]/gi, '');
            getParams[item] = cleanVal;
            if(item === 'date'){
                const today = moment().format('YYYY-MM-DD');
                if(getParams[item] === 'today'){   
                    getParams.expireDate = `${today}`;
                }else if(getParams[item] === 'future'){
                    getParams.expireDate = {'$gt': `${today}`};
                }else if(getParams[item] === 'previous'){
                    getParams.expireDate = {'$lt': `${today}`};
                }
                delete getParams[item];
            }
            
        }
    });
    return getParams;
};

router.get('/list', async(req, res) => {
    console.log('запрос тастов в роуте',req.query)
    const filteredParams = filtrationGetParams(req.query);
    const taskList = await taskController.getAllTasks(filteredParams);
    res.json(taskList);
});

router.post('/change', async(req, res) => {
    const data = req.body;
    console.log(data);
    const filteredParams = filtrationGetParams(req.query);
    const fromDB = await taskController.updateTask(data);
    console.log('с базы приходит после обновления', fromDB._id);
    if(fromDB._id){
        res.json({status: 200});
    }
    //const taskList = await taskController.getAllTasks(filteredParams);
    //res.json(taskList);
});

router.get('/delete/:id', async(req, res) => {
    const id = req.params.id;
    const filteredParams = filtrationGetParams(req.query);
    await taskController.deleteTask(id);
    const taskList = await taskController.getAllTasks(filteredParams);
    res.json(taskList);
});

router.post('/add', upload.none(), async(req, res) => {
    const newTask = req.body;
    const filteredParams = filtrationGetParams(req.query);
    console.log(newTask);
    await taskController.addTask(newTask);
    const taskList = await taskController.getAllTasks(filteredParams);
    res.json(taskList);
});

module.exports = router;