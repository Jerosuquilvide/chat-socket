var express = require('express')
var app = express()


var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/hola', function(req, res){
    res.status(200).send('Hola mundo');
});

var messages = [{
    id: 1,
    text: 'Bienvenido al chat',
    nickname:'Bot-Chatter'
}]

io.on('connection',function(socket){
    console.log('El cliente IP: '+socket.handshake.address+' se conecto al chat...');
    socket.emit('messages',messages);
    socket.on('add-message',function(data){
        messages.push(data);
        io.sockets.emit('messages',messages);
    })
})
server.listen(8080, function(){
    console.log('El servidor esta funcionando correctamente podes verlo en http://localhost:8080');
})


