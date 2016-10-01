const config = require('./config');
const mongoose = require('mongoose');
mongoose.connect('localhost', 'suzette');


//getUserById -> userid, rtm
const listen = require('./app/listen-service');
const userService = require('./app/services/user-service');
const userManager = require('./app/managers/user-manager');
userManager.registerUsersFromWs();

const pwonedHelper = require('./pwoned.helper');
pwonedHelper.getUser('gabriel').then(user => console.log(user));

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
	var result = listen.listenToSuze(message);
	if (null !== result) {
		rtm.sendMessage(userService.getUserById(result.user).name+" s'est fait pwed par "+userService.getUserById(result.pwner).name, 'C2J8W4RK4');
	}
});

// you need to wait for the client to fully connect before you can send messages
rtm.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, function () {
    // This will send the message 'this is a test message' to the channel identified by id 'C0CHZA86Q'
    rtm.sendMessage('gabriel va reussir son annee', 'C2J8W4RK4', function messageSent() {
        // optionally, you can supply a callback to execute once the message has been sent
    });
});

