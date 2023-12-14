const express = require('express');
const router = express.Router();
const priorityController = require('../controllers/priorityController');

// /priority/list
router.get('/list', async(req, res) => {
    const priorityList = await priorityController.getAllPriorities();
    res.json(priorityList);
});
/*
router.get('/add', async(req, res) => {
    const newPriority = {priority: 'Неважные и несрочные'};
    await priorityController.addPriority(newPriority);
});
*/

module.exports = router;