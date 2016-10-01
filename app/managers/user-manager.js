const userManager = require('../services/user-service');
const Pwoned = require('../models/pwoned.model.js');

module.exports = {
    registerUsersFromWs: function registerUsersFromWs() {
        userManager.getUserList()
            .then(function (members) {
                members.forEach(member => {
                    let log = [];
                    log.push('Create date: ' + Date.now);
                    if (member.profile.email) {
                        let user = {
                            username: member.name,
                            email: member.profile.email,
                            idSlack: member.id,
                            firstName: member.profile.first_name,
                            lastName: member.profile.last_name,
                            img_24: member.profile.image_24,
                            points: 100,
                            log: log
                        };
                        Pwoned.create(user, function (err, user) {
                            //TODO
                        });
                    }
                })
            });
    }
};
