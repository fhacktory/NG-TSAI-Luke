const userManager = require('../services/user-service');

module.exports = {
    registerUsers: function registerUsers() {
        userManager.getUserList()
            .then(function(users) {
                users.forEach(user => registerUser(user))
            });
    }
};

function registerUser(user) {

}
