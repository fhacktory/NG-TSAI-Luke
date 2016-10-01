const userService = require('./user-service');
var last = [];

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
	},
	listenRandom: function(message) {
		var result = Math.floor((Math.random() * 10) + 1);

		if (result === 10) {
			rtm.sendMessage("Ta gueule <@"+message.user+"> !", message.channel);
		}
	},
	listenAlone: function(message) {
		var nbMessage = 0;
		var lastMessage = 0;

		for (i = 0; i < 10; i++) {
    		if (last[i] === message.user) {
    			if (i < 3) {
    				lastMessage ++;
    			}
    			nbMessage ++;
    		}
  		}
  		last.unshift(message.user);

		if (nbMessage >= 8 && lastMessage === 3) {
			rtm.sendMessage("Tu parles seul <@"+message.user+"> !", message.channel);
		}
	}


}