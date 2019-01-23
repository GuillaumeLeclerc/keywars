import Client from './client';
import LobbyManager from './lobbyManager';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

const manager = new LobbyManager();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  const newClient = new Client(socket);
  manager.reportLobbies(socket);
  manager.addClient(newClient);
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
