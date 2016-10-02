const pwonedHelper = require('pwoned.helper.js');


module.exports = {
    getPointToTransfert: function (noob, ninja) {
        const changePoint = (result, err) => {
            pwonedHelper.addPoint(ninja, noob, Math.ceil(result.points * 10/100))
        }
        pwonedHelper.getUser(noob).then(changePoint)
    }
}