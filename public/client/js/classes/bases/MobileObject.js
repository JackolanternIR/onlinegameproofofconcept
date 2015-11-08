PT.MobileObject = function() {
    //values
    var character;
    var stopFrames;
    var heading = "x";
    var currentTile = {};
    var currentPixel = {};
    var pathArray = [];
    var spriteHeightOffset;
    var moveTween;
    var tileWidth;
    var startMoving = false;
    var currentMovement;

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
        //save the tileSize
        tileWidth = tileSize;
        o.game.physics.arcade.enable(character);
        //set the current character location
        currentTile = {x: x, y: y};

        /**
         * Set the character's location based on the x and y values.
         * Keep in mind that these are tile locations, not pixel locations.
         * Will need to use the height and width of the char sprite to
         * determine what pixel value to set the char sprite object at using the tile
         */
        spriteHeightOffset = char.height - tileSize;
        spriteHeightOffset = -spriteHeightOffset;
        char.x = x * tileSize;
        char.y = (y * tileSize) + spriteHeightOffset;

        currentPixel = {
            x: char.x,
            y: char.y
        };

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
     * Sets the movement array and begins the recursive movement method
     * @param movementArray An array of movements to get to their target tile
     */
    o.setMovementPath = function(movementArray) {
        pathArray = movementArray;
        startMoving = true;

        //stop the current movement if there is one
        if (currentMovement) {
            currentMovement.stop(false);
            currentMovement = null;
        }

        o.moveCharacter();
    };

    o.moveCharacter = function() {

        //update where the character is now
        currentTile.x = character.x / tileWidth;
        currentTile.y = (character.y - spriteHeightOffset) / tileWidth;
        currentPixel.x = character.x;
        currentPixel.y = character.y;

        //console.log("Current pixel location: (" + character.x + ", " + character.y + ")");

        //remove the first move if the character is not already moving, since it is where the character is
        //do not remove it if they are moving, since it is needed for smooth movement
        if (!startMoving) {
            pathArray = pathArray.slice(1);
        }

        startMoving = false;

        //console.log("To (" + (pathArray[0][0] * tileWidth) + ", " + ((pathArray[0][1] * tileWidth) + spriteHeightOffset) + ")");

        //make sure the movement array was not empty
        if (pathArray.length > 0) {
            moveTween = PT.game.add.tween(character).to({x: (pathArray[0][0] * tileWidth), y: ((pathArray[0][1] * tileWidth) + spriteHeightOffset)}, 250);
            currentMovement = moveTween;
            //if there is a next movement, set it up to run at the end
            if (pathArray.length > 1) {
                //queue up the next movement tween
                moveTween.onComplete.add(o.moveCharacter, this);
            } else {
                //no more moves, so queue to stop animation
                moveTween.onComplete.add(o.stop, this);
            }
            moveTween.start();
            o.setMoveAnimation(pathArray[0][0], pathArray[0][1]);
        }
    };

    /**
     * Sets the animation based on the tile the player is heading to
     * @param tileX
     * @param tileY
     */
    o.setMoveAnimation = function(tileX, tileY) {
        //compare current tile with the tile the player is heading towards
        //also compare to only call animation if the animation is changing
        if ((currentTile.x > tileX) && heading !== 'l') {
            o.left();
            return;
        }
        if ((currentTile.x < tileX) && heading !== 'r') {
            o.right();
            return;
        }
        if ((currentTile.y < tileY) && heading !== 'd') {
            o.down();
            return;
        }
        if ((currentTile.y > tileY) && heading !== 'u') {
            o.up();
            return;
        }
    };

    o.left = function() {
        heading = "l";
        character.animations.play('left');
    };
    o.right = function() {
        heading = "r";
        character.animations.play('right');
    };
    o.up = function() {
        heading = "u";
        character.animations.play('up');
    };
    o.down = function() {
        heading = "d";
        character.animations.play('down');
    };
    o.stop = function() {
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
        heading = "x";
    };

    return o;
};
