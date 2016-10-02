
const videoshow = require('videoshow');
const fs = require('fs')
    , gm = require('gm').subClass({imageMagick: true});
const request = require('request');
const config = require('../../config');

module.exports = {
    generateVideo: function (url, user) {
        console.log(__dirname);
        gm(request(url))
            .motionBlur(90, 60) // effet de blur
            .resize(512, 512) // un des formats des avatars de slack
            .write(config.paf+"/assets/img_tmp/" + user.name + ".jpg", function (err) { // cree la nouvelle image
                console.log("on se chauffe");
                gm(config.paf+"/assets/img_tmp/" + user.name + ".jpg")
                    .composite(config.paf+'/assets/wastedBig.png') // cree une image compose de deux images
                    .geometry('-240%-100%') // pour pouvoir ajuster le calque wasted
                    .write(config.paf+"/assets/img_tmp/" + user.name + "Wasted.jpg", function (err) {
                        console.log("de plus en plus chaud");
                        gm(request(url))
                            .morph(config.paf+"/assets/img_tmp/" + user.name + "Wasted.jpg", config.paf+"/assets/img_tmp/" + user.name + ".jpg", function (err) { // avoir la transition entre les deux images
                                console.log("la on est bouillant");
                                var videoOptions = {
                                    fps: 25,
                                    loop: 1, // seconds
                                    transition: false,
                                    format: 'mp4'
                                }

                                videoshow([{
                                    path: config.paf+"/assets/img_tmp/" + user.name + "-0.jpg"
                                }, {
                                    path: config.paf+"/assets/img_tmp/" + user.name + "-1.jpg"
                                }, {
                                    path: config.paf+"/assets/img_tmp/" + user.name + "-2.jpg",
                                    loop: 3 // long caption
                                }
                                ], videoOptions)
                                    .save(config.paf+'/assets/' + user.name + '.mp4')
                                    .on('error', function (err, stdout, stderr) {
                                        console.log("err", err)
                                        console.log("stdout",stdout);
                                        console.log("stderr",stderr);
                                    })
                                    .on('end', function () {
                                        // l'envoyer a slack
                                        console.log("de la lave en fusion !!!");
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
                                            //console.log('err', err);
                                            //console.log('response', response);
                                        });
                                    });


                            });
                    })
            });
    },
    isDirSync: function (aPath) {
            try {
                return fs.statSync(aPath).isDirectory();
            } catch (e) {
                if (e.code === 'ENOENT') {
                    return false;
                } else {
                    throw e;
                }
            }
        }
};

