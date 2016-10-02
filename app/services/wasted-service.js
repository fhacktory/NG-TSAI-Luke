
const videoshow = require('videoshow');
const fs = require('fs')
    , gm = require('gm').subClass({imageMagick: true});

module.exports = {
    generateVideo: function(url){
        gm(request(url))
            .motionBlur(90,60)
            .resize(512,512)
                .write("./"+user.name+".jpg", function (err) {
                    gm("./"+user.name+".jpg")
                        .composite('../../assets/wastedBig.png')
                        .geometry('-240%-100%')
                        .write("./"+user.name+"Wasted.jpg", function (err) {
                            gm(request(url))
                                .morph("./"+user.name+"Wasted.jpg", "./"+user.name+".jpg",function (err) {
                                    var videoOptions = {
                                        fps: 25,
                                        loop: 1, // seconds
                                        transition: false,
                                        format: 'mp4'
                                    }

                                    videoshow([{
                                        path: "./"+user.name+"-0.jpg"
                                    }, {
                                        path: "./"+user.name+"-1.jpg"
                                    },{
                                        path: "./"+user.name+"-2.jpg",
                                        loop: 3 // long caption
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
    };

