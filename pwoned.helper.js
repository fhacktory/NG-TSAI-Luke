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

const addPoint = (winner, loser, points) => {
    const conditions = {username: username}
    const update = {$inc: {points: points}}
    const options = { multi: false };
    Pwoned.update(conditions, update, options, (err, value) => {})
    const data = {
      winner: winner,
      loser: loser,
      points: points,
      date:  Date.now()
    }
    Pwoned.update({username: username},
		{'$push': {
			'log': data,
		}},
		function(err,model) {
			if(err){
				console.log(err);
			}
  			console.log(model);
		});
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
