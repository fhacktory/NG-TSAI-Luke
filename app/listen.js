var listen = {};

listen.listeToSuze = function(message) {
	var regex = new RegExp('<@(\\w*)>');

	console.log(message);

	if(message.text.indexOf("suze") === 0) {
		var pwner = regex.exec(message.text);
		if (pwner[0] !== null) {
			// pwner[0] : Login avec <@ ... >
			// pwner[1] : Id du user
			console.log('call function callPoint('+message.user+', '+pwner[1]+')');
		}
	}
}
module.exports = listen;
