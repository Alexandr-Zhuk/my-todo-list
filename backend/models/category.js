const mongoose = require('mongoose');

const {Schema} = mongoose;

const categorySchema = new Schema({
    categoryName: {type: Schema.Types.String, minLength: 2, maxLength: 20, required: true},
    user: {type: Schema.Types.ObjectId, required: true},

});

const model = mongoose.model('category', categorySchema);

module.exports = model;