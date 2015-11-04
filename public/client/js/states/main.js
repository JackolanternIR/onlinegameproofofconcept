var mainState = {
    preload: function() {
        this.cursors = PT.game.input.keyboard.createCursorKeys();
        this.char = PT.Character();
    },
    create: function() {
        this.map = PT.game.add.tilemap('samplemap');
        this.map.addTilesetImage('ground');
        this.map.addTilesetImage('grass');
        this.layer = this.map.createLayer('Tile Layer 1');
    },
    update: function() {
        if (this.cursors.left.isDown) {
            this.char.left();
        } else if (this.cursors.right.isDown) {
            this.char.right();
        } else if (this.cursors.up.isDown) {
            this.char.up();
        } else if (this.cursors.down.isDown) {
            this.char.down();
        } else {
            this.char.stop();
        }
    }
};