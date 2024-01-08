const mongoose = require('mongoose');

const { Schema } = mongoose;

const authSchema = new Schema({
    strategy: {type: Schema.Types.String, required: true, default: 'local'},
    userID: {type: Schema.Types.ObjectId, ref: 'user'},
    authData: {type: Schema.Types.Mixed},
    isAuth: {type: Schema.Types.Boolean, default: false},
    refreshToken: {type: Schema.Types.String}
});

const model = mongoose.model('auth', authSchema);

module.exports = model;