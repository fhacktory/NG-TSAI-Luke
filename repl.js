var arDrone = require('ar-drone');
var client  = arDrone.createClient();

client.takeoff();

client
    .after(5000, function() {
        //this.animate('wave', 1500);
        this.animateLeds('blinkRed', 5, 2)
    })
    .after(3000, function() {
        this.stop();
        this.land();
    });
