var port = process.env.PORT || 3000;
var io = require('socket.io').listen(parseInt(port), {origins: '*:*'});

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});


io.sockets.on('connection', function(socket) {
	broadcastEventBuilder(socket)
		.addEvent('idea-new-comment')
		.addEvent('idea-comment-removed')
		.addEvent('idea-rate-like')
		.addEvent('idea-rate-dislike')
		.addEvent('new-idea');
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
