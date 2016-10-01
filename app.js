const config = require('./config');
const mongoose = require('mongoose');
var fs = require('fs')
    , gm = require('gm').subClass({imageMagick: true});
var request = require('request');

var videoshow = require('videoshow');



//getUserById -> userid, rtm
const listen = require('./app/services/listen-service');
const userService = require('./app/services/user-service');

const RtmClient = require('@slack/client').RtmClient;

// The memory data store is a collection of useful functions we can include in our RtmClient
const MemoryDataStore = require('@slack/client').MemoryDataStore;

const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const RTM_CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;

rtm = new RtmClient(config.key, {
    // Sets the level of logging we require
    logLevel: config.logLevel,
    // Initialise a data store for our client, this will load additional helper functions for the storing and retrieval of data
    dataStore: new MemoryDataStore()
});
rtm.start();

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
});

rtm.on(RTM_EVENTS.MESSAGE, function (message) {
    var user = userService.getUserById(message.user);
    console.log(user.profile);
    var url = user.profile.image_512;
    gm(request(url))
        .motionBlur(90,60)
        .resize(512,512)
    .write("./"+user.name+".jpg", function (err) {
        gm("./"+user.name+".jpg")
            .composite('./wastedBig.png')
            .geometry('-240%-100%')
            .write("./"+user.name+"Wasted.jpg", function (err) {
                gm(request(url))
                    .morph("./"+user.name+"Wasted.jpg", "./"+user.name+".jpg",function (err) {
                        // gm("./"+user.name+".jpg")
                        //     .composite('./wastedBig.png')
                        //     .geometry('-240%-100%')
                        //     .write("./"+user.name+".jpg", function (err) {
                        //
                        //     })
                        var images = [
                            "./"+user.name+"-0.jpg",
                            "./"+user.name+"-1.jpg",
                            "./"+user.name+"-2.jpg"
                        ];

                        var options = {
                            transition: true
                        }

                        videoshow(images, options)
                            .audio('./wasted.mp3')
                            .save('video.mp4')
                            .on('start', function (command) {
                                console.log('ffmpeg process started:', command)
                            })
                            .on('error', function (err) {
                                console.error('Error:', err)
                            })
                            .on('end', function (output) {
                                console.log('Video created in:', output)
                            })

                    });
            })
    });


    var result = listen.listenToSuze(message);
	if (null !== result) {
		//rtm.sendMessage(userService.getUserById(result.user).name+" s'est fait pwed par "+userService.getUserById(result.pwner).name, 'C2J8W4RK4');
	}
});

// you need to wait for the client to fully connect before you can send messages
rtm.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, function () {
    // This will send the message 'this is a test message' to the channel identified by id 'C0CHZA86Q'
    // rtm.sendMessage('gabriel va reussir son annee', 'C2J8W4RK4', function messageSent() {
    //     // optionally, you can supply a callback to execute once the message has been sent
    // });
});

userService.getUserList()
    .then(res => console.log(res))
    .catch(e => console.error(e));

rtm.start();
