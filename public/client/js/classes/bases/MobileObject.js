PT.MobileObject = function() {
    //values
    var character;
    var stopFrames;
    var heading = "d";
    var currentTile = {};
    var currentPixel = {};
    var movementTweens;

    //inherit from PT.Base
    var o = PT.Base();

    //stillFrames is an array of the still frames for the different directions in the form:
    // [up, down, left, right]
    /**
     * Sets core data about the mobile object
     * @param char A Phaser sprite object that represents the character
     * @param x The X location of the character (tile, not pixel)
     * @param y The Y location of the character (tile, not pixel)
     * @param tileSize The size of one side of the square tiles that make up the map
     * @param stillFrames An array of sprite sheet cells representing the still frames for [up, down, left, right]
     */
    o.setCharacterObject = function(char, x, y, tileSize, stillFrames) {
        //set the character field and set physics settings
        character = char;
        o.game.physics.arcade.enable(character);
        //set the current character location
        currentTile = {x: x, y: y};

        /**
         * Set the character's location based on the x and y values.
         * Keep in mind that these are tile locations, not pixel locations.
         * Will need to use the height and width of the char sprite to
         * determine what pixel value to set the char sprite object at using the tile
         */
        var spriteHeightOffset = char.height - tileSize;
        char.x = x * tileSize;
        char.y = (y * tileSize) - spriteHeightOffset;

        currentPixel = {
            x: char.x,
            y: char.y
        };

        //also set the pixel location

        stopFrames = stillFrames;
    };

    /**
     * Gets the current location in tile coordinates of this object (not pixels)
     * @returns {{}} A point object containing x and y tile coordinates of the character (not pixels)
     */
    o.getCurrentTileLocation = function() {
        if (currentTile.x || currentTile.x === 0) {
            return currentTile;
        } else {
            throw "Location is not set.";
        }
    };

    /**
     * Gets the current pixel location of the character
     * @returns {{}} A point object containing the x and y pixel coordinates of the character
     */
    o.getCurrentPixelLocation = function() {
        if (currentPixel.x || currentPixel.x === 0) {
            return currentPixel;
        } else {
            throw "Pixel location is not set.";
        }
    };

    /**
     * Tweens the character to their new location
     * @param movementArray An array of movements to get to their target tile
     */
    o.moveCharacter = function(movementArray) {
        console.log(movementArray);
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
