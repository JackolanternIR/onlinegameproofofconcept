var usersService = require('./usersService');

var server;

module.exports.setSocketServer = function(inServer) {
    server = inServer;
};

module.exports.socketConnection = function(socket) {
    console.log("Socket connected!");

    socket.on('login', function(loginName){
        console.log(loginName + " logged in");
        usersService.addNewUser(loginName, socket.id);
        socket.emit('loggedIn');
    });

    socket.on('message', function(chatText){
        var senderName = usersService.getNameById(socket.id);
        console.log("Received message from " + senderName);
        if (senderName !== null) {
            server.emit('message', {name: senderName, msg: chatText});
        }
    });

};