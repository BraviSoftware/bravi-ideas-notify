var io = require('socket.io').listen(8080);

io.sockets.on('connection', function(socket) {
  socket.on('idea-commented', function(data) {
    io.sockets.emit('idea-inserted', data);
  });
});
