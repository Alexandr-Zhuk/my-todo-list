const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
    taskName: {type: Schema.Types.String, minLength: 2},
    isDone: {type: Boolean, default: false},
    category: {type: Schema.Types.ObjectId, ref: 'category', default: null},
    priority: {type: Schema.Types.ObjectId, ref: 'priority', default: null},
    expireDate: {type: Schema.Types.Date},
    user: {type: Schema.Types.ObjectId}
});

const model = mongoose.model('task', taskSchema);

module.exports = model;