const config = require('./config');
const mongoose = require('mongoose');
var fs = require('fs')
    , gm = require('gm').subClass({imageMagick: true});
var request = require('request');

var videoshow = require('videoshow');
var Slack = require('node-slack-upload');
var slack = new Slack(config.key);
var WebClient = require('@slack/client').WebClient;
const path = require('path');



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
var web = new WebClient(config.key);

rtm.start();

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
    //console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
});

rtm.on(RTM_EVENTS.MESSAGE, function (message) {
    var user = userService.getUserById(message.user);
    //console.log(user.profile);
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
                        var videoOptions = {
                            fps: 25,
                            loop: 1, // seconds
                            transition: true,
                            transitionDuration: 0.5, // seconds
                            format: 'mp4'
                        }

                        videoshow([{
                            path: "./"+user.name+"-0.jpg"
                        }, {
                            path: "./"+user.name+"-1.jpg"
                        },{
                            path: "./"+user.name+"-2.jpg",
                            loop: 10 // long caption
                        }
                        ], videoOptions)
                            .save(user.name+'.mp4')
                            .on('error', function (err, stdout, stderr) {
                                console.log(stdout);
                                console.log(stderr);
                                })
                            .on('end', function () {
                                request.post({
                                    url: 'https://slack.com/api/files.upload',
                                    formData: {
                                        token: config.key,
                                        filename: "video.mp4",
                                        filetype: "auto",
                                        channels: "C2J8W4RK4",
                                        file: fs.createReadStream(user.name+'.mp4')
                                    }
                                }, function (err, response) {
                                    console.log('err',err);
                                    console.log('response',response);
                                    console.log(JSON.parse(response.body));
                                });
                            });


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

//userService.getUserList()
//    .then(res => console.log(res))
//    .catch(e => console.error(e));

rtm.start();
