const rp = require('request-promise-native');
const token = require('../../config').token;
const url = `https://slack.com/api/users.list?token=${token}`;

module.exports = {
    getUserList: function getUserList() {
        return rp(url)
            .then(function(res) {
                res = JSON.parse(res);
                return res.members;
            });
    },
    getUserById: function(userid) {
        const user = rtm.dataStore.getUserById(userid);
        return user;
    }
};
