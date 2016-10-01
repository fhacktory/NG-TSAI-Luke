module.exports = {
    getUserById: function(userid, rtm) {
        var user = rtm.dataStore.getUserById(userid);
        return user;
    }
};
