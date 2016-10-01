'use strict'

const path = process.cwd();
const Pwoned = require(path + '/pwoned.model.js')

const create  =  (username, email) =>{
    var user = {
        username: username,
        email: email
    };
    Pwoned.create(user)
}

const addPoint = (username, points) => {
    const condition = {username: username},
        update = {$inc: {points: points}}
    Pwoned.update(conditions, update, options, callback)
}

const getUser = (username) => {
    Pwoned
        .find({username: username}
            .exec((err, result) => return result)
        }
}
module.exports = create;
module.exports = addPoint;
module.exports = getUser;
