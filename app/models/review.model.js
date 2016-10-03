'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Review = new Schema({
    branch: String,
    reatedBy: String,
    assignTo: String,
    status: Boolean,
    log:[]
});

module.exports = mongoose.model('Review', Review);
