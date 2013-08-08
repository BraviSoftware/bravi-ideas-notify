var port = process.env.PORT || 80;
var io = require('socket.io').listen(parseInt(port));

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10);
});

io.sockets.on('connection', function(socket) {
  broadcastEventBuilder(socket)
  .addEvent('idea-new-comment')
  .addEvent('idea-comment-removed')
  .addEvent('idea-rate')
  .addEvent('new-idea')
  .addEvent('idea-updated')
  .addEvent('idea-removed');
});

function broadcastEventBuilder(theSocket) {
  var socket = theSocket;

  var addEvent = function(eventName) {
    socket.on(eventName, function(data) {
      console.log(eventName);
      socket.broadcast.emit(eventName, data);
    });
    return this;
  }

  return {
    addEvent : addEvent
  };
}
