PT.MobileObject = function() {
    //values
    var velocity;
    var character;
    var stopFrames;
    var heading = "d";

    //inherit from PT.Base
    var o = PT.Base();

    //stillFrames is an array of the still frames for the different directions in the form:
    // [up, down, left, right]
    o.setCharacterObject = function(char, vel, stillFrames) {
        //set the character field and set physics settings
        character = char;
        o.game.physics.arcade.enable(character);
        character.body.collideWorldBounds = true;
        //set the velocity and stopped frame
        velocity = vel;
        stopFrames = stillFrames;
    };

    o.left = function() {
        if (!character) throw "No character set!";
        character.body.velocity.x = -velocity;
        heading = "l";
        character.animations.play('left');
    };
    o.right = function() {
        character.body.velocity.x = velocity;
        heading = "r";
        character.animations.play('right');
    };
    o.up = function() {
        character.body.velocity.y = -velocity;
        heading = "u";
        character.animations.play('up');
    };
    o.down = function() {
        character.body.velocity.y = velocity;
        heading = "d";
        character.animations.play('down');
    };
    o.stop = function() {
        character.body.velocity.x = 0;
        character.body.velocity.y = 0;
        character.animations.stop();
        //set the stop frame depending on the direction previously headed
        switch (heading) {
            case 'u':
                character.frame = stopFrames[0];
                break;
            case 'd':
                character.frame = stopFrames[1];
                break;
            case 'l':
                character.frame = stopFrames[2];
                break;
            case 'r':
                character.frame = stopFrames[3];
                break;
        }
    };

    return o;
};
