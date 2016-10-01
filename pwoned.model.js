'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pwoned = new Schema({
    username: String,
    email: {type: String, unique: true},
    points: {type:int, default: 100}
});


module.exports = mongoose.model('Pwoned', Pwoned);
