'use strict'

const path = process.cwd();
const Review = require(path + '/app/models/review.model.js')

const addReview = (username, branch) => {
    log = [];
    log.push({type: "creation", date: Date.now()})
    let review = {
        branch: branch,
        createdBy: createdBy,
        log: log
    };
    Review.create(review)
}

const assignReview = (username, branch) => {

    const options = { multi: false };

    Review.update({branch: branch}, {$set: {assignTo: username}}, options, (err, value) => {
        if(err){
            console.log("err", err);
        }
        console.log("value", value);
    })

    const data = {
        type: 'new assignation to ' + username,
        date: Date.now()
    }

    Review.update({branch: branch},
        {'$push': {
            'log': data,
        }},
        function(err,model) {
            if(err){
                console.log("err", err);
            }
            console.log("model", model);
        });

}

const getUser = (username) => {
    return Review
        .findOne({username: username})
        .exec()
}

module.exports = {
    addReview: addReview,
    assignReview: assignReview,
    getUser: getUser
}
