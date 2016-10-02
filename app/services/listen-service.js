const userService = require('./user-service');
const Pwoned = require('../models/pwoned.model.js');
const pointService = require('./point-service');
const pwonedHelper = require('../../pwoned.helper');

var player = require('play-sound')(opts = {})
var last = [];

module.exports = {
    listenToSuze: function(message) {
		var regex = new RegExp('<@(\\w*)>');

		if (message.text && message.text.indexOf("suze") === 0) {
			var pwner = regex.exec(message.text);
			if (pwner !== null && pwner[0] !== null) {
				// pwner[0] : Login avec <@ ... >
				// pwner[1] : Id du user

				var user = userService.getUserById(message.user);
    			noobInfo = pwonedHelper.getUser(user.name).then(function(result, err) {
	    			console.log("noobInfo", result.log);
	    			console.log("lenght", result.log.length);
	    			console.log("last", result.log[result.log.length - 1]);

	    			var diff = (Date.now() - result.log[result.log.length - 1].date);

	    			if (diff > 300000) {
						player.play('assets/wasted.mp3', function(err){
						    console.log(err);
						}); // $ mplayer foo.mp3  

						rtm.sendMessage(user.name+" s'est fait pwed par "+userService.getUserById(pwner[1]).name, message.channel);
						pointService.getPointToTransfert(user.name, userService.getUserById(pwner[1]).name);

						return true;
					} else {
						rtm.sendMessage("Vous devez patientez "+Math.ceil((300000 - diff) / 1000)+" secondes avant de pwed "+user.name, message.channel);
						return false;
					}
    			});
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
	},
	listenResult: function(message) {
		if (message.text === 'result') {
			var ranking = '';
			Pwoned
			    .find()
			    .exec((err, result) =>{
			        if (err){
			            res.send(err)
			        } else {
			        	result.forEach(function(element) {
			        		ranking += "<@"+element['idSlack']+"> "+element['points']+"\n";
			        	});
			        	var dm = userService.getDMById(message.user);
			            rtm.sendMessage(ranking, dm.id);
			        }
			    });
		}
	}
}
