const userManager = require('../services/user-service');
const Pwoned = require('../models/pwoned.model.js');

module.exports = {
    registerUsersFromWs: function registerUsersFromWs() {
        userManager.getUserList()
            .then(function (members) {
                members.forEach(member => {
                    if (member.profile.first_name) {
                        let user = {
                            username: member.name,
                            email: member.email,
                            idSlack: member.id,
                            firstName: member.profile.first_name,
                            lastName: member.profile.last_name,
                            points: 100
                        };
                        Pwoned.create(user);
                    }
                })
            });
    }
};
