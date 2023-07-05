const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
    taskName: {type: Schema.Types.String, min: 2},
    isDone: {type: Boolean, default: false},
    category: {type: Schema.Types.ObjectId},
    priority: {type: Schema.Types.ObjectId},
    expireDate: {type: Schema.Types.Date}
});

const model = mongoose.model('task', taskSchema);

module.exports = model;