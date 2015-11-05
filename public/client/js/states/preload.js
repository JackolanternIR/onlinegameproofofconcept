var loadState = {
    preload: function () {
        // Add a 'loading...' label on the screen
        var loadingLabel = PT.game.add.text(PT.game.world.centerX, 150, 'loading...',
            { font: '30px Arial', fill: '#ffffff' });
        loadingLabel.anchor.setTo(0.5, 0.5);

        // Display the progress bar
        var progressBar = PT.game.add.sprite(PT.game.world.centerX, 200, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        PT.game.load.setPreloadSprite(progressBar);

        // Load animations
        PT.game.load.spritesheet('character', '/images/character.png', 32, 48, 12);

        // Load the tilemap and supporting tilesets
        PT.game.load.image('ground', '/images/tileA2_dungeons.png');
        PT.game.load.image('grass', '/images/tileA2_outside.png');

        PT.game.load.tilemap('samplemap', '/tilemaps/othersample.json', null, Phaser.Tilemap.TILED_JSON);


    },

    create: function() {
        // Go to the menu state
        PT.game.state.start('main');
    }

};
