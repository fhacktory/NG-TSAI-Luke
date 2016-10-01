const pwonedHelper = require('../../pwoned.helper');



module.exports = {
    getPointToTransfert: function (noob, ninja) {
        const changePoint = (result, err) => {
            pwonedHelper.addPoint(ninja, result.points * 10/100)
            pwonedHelper.addPoint(noob, result.points * 10/100 * -1)
        }
        pwonedHelper.getUser(noob).then(changePoint)
    }
}