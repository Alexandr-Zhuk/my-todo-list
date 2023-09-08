const express = require('express');
const taskRouter = require('./routes/tasks');
const categoryRouter = require('./routes/category');
const priorityRouter = require('./routes/priority');

const server = express();
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/toDoList');

server.listen(3000);

server.set('view engine', 'ejs');
server.set('views', __dirname + '/views');

server.use(express.json());
server.use(express.urlencoded({extended: false}));

server.use(express.static(__dirname + '/public'));
server.use('/tasks', taskRouter);
server.use('/category', categoryRouter);
server.use('/priority', priorityRouter);