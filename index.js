var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat-message', (msg) => {
        socket.broadcast.emit('chat-message', msg)
    })
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })
    socket.on('stoptyping', (data) => {
        socket.broadcast.emit('stoptyping', data)
    })
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});