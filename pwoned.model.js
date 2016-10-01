'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pwoned = new Schema({
    username: String,
    email: String
});


module.exports = mongoose.model('Pwoned', Pwoned);
