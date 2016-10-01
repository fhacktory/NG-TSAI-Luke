'use strict'

const path = process.cwd();
const Pwoned = require(path + '/app/models/pwoned.model.js')

const create = (username, email) => {
    var user = {
        username: username,
        email: email
    };
    Pwoned.create(user)
}

const addPoint = (username, points) => {
    const conditions = {username: username}
    const update = {$inc: {points: points}}
    const options = { multi: false };
    return Pwoned.update(conditions, update, options)
}

const getUser = (username) => {
    return Pwoned
        .findOne({username: username})
        .exec()
}

module.exports = {
    create: create,
    addPoint: addPoint,
    getUser: getUser
}
