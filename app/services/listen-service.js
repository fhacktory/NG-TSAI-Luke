const userService = require('./user-service');

module.exports = {
    listenToSuze: function(message) {
		var regex = new RegExp('<@(\\w*)>');

		if (message.text && message.text.indexOf("suze") === 0) {
			var pwner = regex.exec(message.text);
			if (pwner !== null && pwner[0] !== null) {
				// pwner[0] : Login avec <@ ... >
				// pwner[1] : Id du user
				rtm.sendMessage(userService.getUserById(message.user).name+" s'est fait pwed par "+userService.getUserById(pwner[1]).name, message.channel);
				return true;
			}
		}
		return false;
	}
}
