module.exports = {
    listenToSuze: function(message) {
		var regex = new RegExp('<@(\\w*)>');

		console.log('message',message);
		var result = null;

		if(message.text.indexOf("suze") === 0) {
			var pwner = regex.exec(message.text);
			if (pwner[0] !== null) {
				// pwner[0] : Login avec <@ ... >
				// pwner[1] : Id du user
				result = {
					'user': message.user,
					'pwner': pwner[1]
				}
			}
		}
		return result;
	}
}
