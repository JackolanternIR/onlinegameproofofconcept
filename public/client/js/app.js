
if (bowser.msie && bowser.version <= 9) {
    alert("You're browser is not compatible with this demo. Please update, preferably to Google Chrome.");
} else {

    //start setting-up Phaser
    PT.game.state.add('boot', bootState);
    PT.game.state.add('load', loadState);
    PT.game.state.add('main', mainState);

    PT.game.state.start('boot');

    //connect to socket.io
    PT.socket = io();

    var tryLogin = function(message) {
        if (!message) {
            message = "Please enter a username";
        }
        var username = prompt(message, "username");
        if (!username || username === 'username') {
            username = "User" + parseInt(((Math.random() * 9999) + 1));
        }
        //connect to the server
        PT.socket.emit('login', username);
    };

    //prompt for username
    tryLogin();

    PT.socket.on('loggedIn', function(data){
        //make sure there were no errors
        if (!data.loggedIn) {
            tryLogin(data.error);
            return;
        }

        //create the character
        //TODO - Setup the character
        ClientServices.ClientCharacterService.setOwnPlayerCharacter(data.point.x, data.point.y, data.name);

    });


}