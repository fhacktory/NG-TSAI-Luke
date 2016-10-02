'use strict'

const path = process.cwd();
const Pwoned = require(path + '/app/models/pwoned.model.js')

const create = (username, email) => {
    let user = {
        username: username,
        email: email
    };
    Pwoned.create(user)
}

const addPoint = (winner, loser, points) => {

    console.log(winner, loser, points);
    const options = { multi: false };

    Pwoned.update({username: winner}, {$inc: {points: points}}, options, (err, value) => {})
    Pwoned.update({username: loser}, {$inc: {points: points * -1}}, options, (err, value) => {})

    const data = {
      winner: winner,
      loser: loser,
      points: points,
      date:  Date.now()
    }

    Pwoned.update({username: winner},
		{'$push': {
			'log': data,
		}},
    function(err,model) {
      if(err){
        console.log("err", err);
      }
        console.log("model", model);
    });

  const data_loose = {
      winner: winner,
      loser: loser,
      points: points * -1,
      date:  Date.now()
    }

  Pwoned.update({username: loser},
    {'$push': {
      'log': data_loose,
    }},
    function(err,model) {
      if(err){
        console.log("err", err);
      }
        console.log("model", model);
    });

}

const getUser = (username) => {
    return Pwoned
        .findOne({username: username})
        .exec()
}

const playerToKill = () => {
  return Pwoned
      .findOne()
      .sort({points: 'descending'})
      .exec()
}

module.exports = {
    create: create,
    addPoint: addPoint,
    getUser: getUser,
    playerToKill: playerToKill
}
