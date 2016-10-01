const pwonedHelper = require('../../pwoned.helper');



module.exports = {
    getPointToTransfert: function (noob, ninja) {
        const changePoint = (err, result) => {
            pwonedHelper.addPoint(ninja, result);
            pwonedHelper.getUser(noob).then(changePoint)
        }
    }
}