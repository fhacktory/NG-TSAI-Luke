'use strict'

const userService = require('./user-service');
const Pwoned = require('../models/pwoned.model.js');
const pointService = require('./point-service');
const pwonedHelper = require('./pwoned.helper.js');
const wastedService = require('./wasted-service');
const config = require('../../config');
const fs = require('fs');
const request = require('request');


const arDrone = require('ar-drone');
const client = arDrone.createClient();

const player = require('play-sound')({});
let last = [];

module.exports = {
    listenToSuze: function (message) {
        const regex = new RegExp('<@(\\w*)>');

        if (message.text && message.text.indexOf("suze") === 0) {
            let pwner = regex.exec(message.text);
            if (pwner !== null && pwner[0] !== null) {
                // pwner[0] : Login avec <@ ... >
                // pwner[1] : Id du user
                makeItDanceBaby();

				let user = userService.getUserById(message.user);
				// partie génération du gif selon l'avatar 512
				var url = user.profile.image_512;
				// verifie si on a pas déjà cree la video
				try {
					fs.accessSync(config.paf+'/assets/' + user.name + '.mp4');
					request.post({
						url: 'https://slack.com/api/files.upload',
						formData: {
							token: config.key,
							filename: "video.mp4",
							filetype: "auto",
							channels: "C2J8W4RK4",
							file: fs.createReadStream(config.paf+'/assets/' + user.name + '.mp4')
						}
					}, function (err, response) {
					});
				} catch (e) {

					wastedService.generateVideo(url, user);
				}

    			var noobInfo = pwonedHelper.getUser(user.name).then(function(result, err) {
	    			var diff = (Date.now() - result.log[result.log.length - 1].date);

					if (diff > 300000 || message.text.indexOf("suzeforce") === 0) {
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
		let result = Math.floor((Math.random() * 10) + 1);

        if (result === 10) {
            rtm.sendMessage("Ta gueule <@" + message.user + "> !", message.channel);
        }
    },
    listenAlone: function (message) {
        let nbMessage = 0;
        let lastMessage = 0;

        for (let i = 0; i < 10; i++) {
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
			let ranking = '';
			Pwoned
			    .find()
			    .exec((err, result) =>{
			        if (err){
			            res.send(err)
			        } else {
			        	result.forEach(function(element) {
			        		ranking += "<@"+element['idSlack']+"> "+element['points']+"\n";
			        	});
			        	let dm = userService.getDMById(message.user);
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
