'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pwoned = new Schema({
    username: String,
    email: {type: String, unique: true},
    idSlack: String,
    firstName: String,
    lastName: String,
    img_24: String,
    points: {type: Number, default: 100},
    log:[]
});

module.exports = mongoose.model('Pwoned', Pwoned);
