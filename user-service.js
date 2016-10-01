module.exports = {
    getUserById: function(userid) {
        var user = rtm.dataStore.getUserById(userid);
        return user;
    }
};
