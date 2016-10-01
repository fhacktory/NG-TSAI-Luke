'user strict'

const path = process.cwd();
const Pwoned = require(path + '/pwoned.model.js')

const create  =  (username, email) =>{
        var user = {
            username: username,
            email: email
        };
        Pwoned.create(user)
}

module.exports = recipeHandler;
