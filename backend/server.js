const express = require('express');
const cookieParser = require('cookie-parser');
const taskRouter = require('./routes/tasks');
const categoryRouter = require('./routes/category');
const priorityRouter = require('./routes/priority');
const authRouter = require('./routes/auth');

const server = express();
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/toDoList');

server.listen(5000);

server.set('view engine', 'ejs');
server.set('views', __dirname + '/views');

server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use(express.static(__dirname + '/public'));
server.use('/tasks', taskRouter);
server.use('/category', categoryRouter);
server.use('/priority', priorityRouter);
server.use('/auth', authRouter);