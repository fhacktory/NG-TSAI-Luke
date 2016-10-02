const userService = require('./user-service');
const Pwoned = require('../models/pwoned.model.js');
const pointService = require('./point-service');

const arDrone = require('ar-drone');
const client = arDrone.createClient();

var player = require('play-sound')(opts = {})
var last = [];

module.exports = {
    listenToSuze: function (message) {
        var regex = new RegExp('<@(\\w*)>');

        if (message.text && message.text.indexOf("suze") === 0) {
            var pwner = regex.exec(message.text);
            if (pwner !== null && pwner[0] !== null) {
                // pwner[0] : Login avec <@ ... >
                // pwner[1] : Id du user
                makeItDanceBaby();

                player.play('assets/wasted.mp3', function (err) {
                    console.log(err);
                }); // $ mplayer foo.mp3

                rtm.sendMessage(userService.getUserById(message.user).name + " s'est fait pwed par " + userService.getUserById(pwner[1]).name, message.channel);
                pointService.getPointToTransfert(userService.getUserById(message.user).name, userService.getUserById(pwner[1]).name);
                return true;
            }
        }
        return false;
    },
    listenRandom: function (message) {
        var result = Math.floor((Math.random() * 10) + 1);

        if (result === 10) {
            rtm.sendMessage("Ta gueule <@" + message.user + "> !", message.channel);
        }
    },
    listenAlone: function (message) {
        var nbMessage = 0;
        var lastMessage = 0;

        for (i = 0; i < 10; i++) {
            if (last[i] === message.user) {
                if (i < 3) {
                    lastMessage++;
                }
                nbMessage++;
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

function makeItDanceBaby() {
    client.takeoff();

    client
        .after(3000, function () {
            this.up(0.5);
            this.animateLeds('blinkRed', 5, 2)
        })
        .after(3000, function() {
            this.stop();
            this.animate('yawShake', 6000);
        })
        .after(8000, function () {
            this.stop();
            this.land();
        });
}
