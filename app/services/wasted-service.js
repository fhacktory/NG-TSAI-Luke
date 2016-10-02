
const videoshow = require('videoshow');
const fs = require('fs')
    , gm = require('gm').subClass({imageMagick: true});
const request = require('request');

module.exports = {
    generateVideo: function (url) {
        gm(request(url))
            .motionBlur(90, 60) // effet de blur
            .resize(512, 512) // un des formats des avatars de slack
            .write("./" + user.name + ".jpg", function (err) { // cree la nouvelle image
                gm("./" + user.name + ".jpg")
                    .composite('../../assets/wastedBig.png') // cree une image compose de deux images
                    .geometry('-240%-100%') // pour pouvoir ajuster le calque wasted
                    .write("../../assets/img_tmp/" + user.name + "Wasted.jpg", function (err) {
                        gm(request(url))
                            .morph("../../assets/img_tmp/" + user.name + "Wasted.jpg", "../../assets/img_tmp/" + user.name + ".jpg", function (err) { // avoir la transition entre les deux images
                                var videoOptions = {
                                    fps: 25,
                                    loop: 1, // seconds
                                    transition: false,
                                    format: 'mp4'
                                }

                                videoshow([{
                                    path: "../../assets/img_tmp/" + user.name + "-0.jpg"
                                }, {
                                    path: "../../assets/img_tmp/" + user.name + "-1.jpg"
                                }, {
                                    path: "../../assets/img_tmp/" + user.name + "-2.jpg",
                                    loop: 3 // long caption
                                }
                                ], videoOptions)
                                    .save('../../assets/' + user.name + '.mp4')
                                    .on('error', function (err, stdout, stderr) {
                                        console.log(stdout);
                                        console.log(stderr);
                                    })
                                    .on('end', function () {
                                        // l'envoyer a slack
                                        request.post({
                                            url: 'https://slack.com/api/files.upload',
                                            formData: {
                                                token: config.key,
                                                filename: "video.mp4",
                                                filetype: "auto",
                                                channels: "C2J8W4RK4",
                                                file: fs.createReadStream('../../assets/' + user.name + '.mp4')
                                            }
                                        }, function (err, response) {
                                            console.log('err', err);
                                            console.log('response', response);
                                            console.log(JSON.parse(response.body));
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

