const config = require('./config');
const mongoose = require('mongoose');
const RtmClient = require('@slack/client').RtmClient;

const token = config.key;

console.log(token)
const rtm = new RtmClient(token, {logLevel: 'debug'});
rtm.start();

const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
});

const RTM_EVENTS = require('@slack/client').RTM_EVENTS;

rtm.on(RTM_EVENTS.MESSAGE, function (message) {
    // Listens to all `message` events from the team
});

rtm.on(RTM_EVENTS.CHANNEL_CREATED, function (message) {
    // Listens to all `channel_created` events from the team
});

const RTM_CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;

// you need to wait for the client to fully connect before you can send messages
rtm.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, function () {
    // This will send the message 'this is a test message' to the channel identified by id 'C0CHZA86Q'
    rtm.sendMessage('gabriel va rater son annee', 'C2J8W4RK4', function messageSent() {
        // optionally, you can supply a callback to execute once the message has been sent
    });
});
