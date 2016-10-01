'use strict'

const path = process.cwd();
const Pwoned = require('../models/pwoned.model.js')
const express = require('express');
const router = express.Router();


router.get('/all', function (req, res) {
  Pwoned
    .find()
    .exec((err, result) =>{
        if (err){
            res.send(err)
        } else {
            res.send(result)
        }
    })
});



module.exports = router;
