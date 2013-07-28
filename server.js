var io = require('socket.io').listen(8080);

io.sockets.on('connection', function(socket) {
	broadcastEventBuilder(socket)
		.addEvent('idea-new-comment')
		.addEvent('idea-comment-removed')
		.addEvent('idea-rate-like')
		.addEvent('idea-rate-dislike');
});

function broadcastEventBuilder(theSocket) {
	var socket = theSocket;

	var addEvent = function(eventName) {
		socket.on(eventName, function(data) {
			socket.broadcast.emit(eventName, data);
		});
		return this;
	}

	return {
		addEvent : addEvent
	};
}
