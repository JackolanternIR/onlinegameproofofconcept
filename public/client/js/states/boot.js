var bootState = {

    preload: function () {

        // Load the image
        PT.game.load.image('progressBar', '/images/progressBar.png');
    },

    create: function() {

        console.log("Inside the bootState create function");

        // Set some game settings #3498db
        PT.game.stage.backgroundColor = '#228B22';
        PT.game.physics.startSystem(Phaser.Physics.ARCADE);
        // If the device is not a desktop, so it's a mobile device
        if (!PT.game.device.desktop) {
            // Set the type of scaling to 'show all'
            PT.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            // Add a blue color to the page, to hide the white borders we might have
            document.body.style.backgroundColor = '#3498db';
            // Set the min and max width/height of the game
            PT.game.scale.minWidth = 170;
            PT.game.scale.minHeight = 250;
            PT.game.scale.maxWidth = 680;
            PT.game.scale.maxHeight = 1000;
            // Center the game on the screen
            PT.game.scale.pageAlignHorizontally = true;
            PT.game.scale.pageAlignVertically = true;
            // Apply the scale changes
            PT.game.scale.setScreenSize(true);

            // Start the load state
            PT.game.state.start('load');
        } else {
            // Start the load state
            PT.game.state.start('load');
        }
    }

};