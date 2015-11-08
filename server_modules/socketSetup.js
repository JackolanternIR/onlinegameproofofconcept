var usersService = require('./usersService');

var server;

module.exports.setSocketServer = function(inServer) {
    server = inServer;
};

module.exports.socketConnection = function(socket) {
    console.log("Socket connected!");

    socket.on('login', function(loginName){
        var nameCheck = usersService.getUser(loginName);
        if (nameCheck) {
            console.log(loginName + " is already in use.");
            socket.emit('loggedIn', {loggedIn: false, error: "There is already someone with that name. Try again."});
        }

        //TODO set a random point to begin at and check if walkable once server-side map set up
        //set initial position


        console.log(loginName + " logged in");
        usersService.addNewUser(loginName, socket.id, socket);
        //TODO change to use the defined point to start the character at once server-side map set up
        socket.emit('loggedIn', {loggedIn: true, point: {x: 0, y: 0},name: loginName, error: ""});
    });

    socket.on('message', function(chatText){
        var senderName = usersService.getNameById(socket.id);
        console.log("Received message from " + senderName);
        if (senderName !== null) {
            server.emit('message', {name: senderName, msg: chatText});
        }
    });



};