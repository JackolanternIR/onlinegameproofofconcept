
var express = require('express');
var app = express();
var path = require('path');
var index = require('./routes/index');
var http = require('http').Server(app);
var gameView = require('./routes/game');
var server = require('socket.io');
var io = server(http);
var socketSetup = require('./server_modules/socketSetup');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index);
app.get('/game', gameView.gamePage);

io.on('connection', socketSetup.socketConnection);
socketSetup.setSocketServer(io);

http.listen(3000, function(){
    console.log('listening on port 3000');
});




