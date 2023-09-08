const mongoose = require('mongoose');

const { Schema } = mongoose;

const prioritySchema = new Schema({
    priority: {type: Schema.Types.String},
});

const model = mongoose.model('priority', prioritySchema);

module.exports = model;