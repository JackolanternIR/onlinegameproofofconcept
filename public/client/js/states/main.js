var mainState = {
    preload: function() { },
    create: function() {

        var that = this;
        PT.gameState = this;

        //create the tilemap
        this.map = PT.game.add.tilemap('samplemap');
        this.map.addTilesetImage('ground');
        this.map.addTilesetImage('grass');
        this.layer = this.map.createLayer('Tile Layer 1');
        var tileset = this.layer.getTiles(0, 0, 1024, 800);
        this.tileKey = ClientServices.TileKeyService(this.map, this.layer, 32, 32, 193, 15, ClientServices.WalkingService);

        //create the character
        //this.char = PT.Character(0, 0);


        //create the mouseDown event
        //var tileX, tileY, currentTiles;
        //PT.game.input.mouse.onMouseDown = function(e) {
        //    tileX = that.layer.getTileX(e.layerX);
        //    tileY = that.layer.getTileY(e.layerY);
        //    currentTiles = that.char.getCurrentTileLocation();
        //    ClientServices.WalkingService.clickMap(that.char, tileX, tileY);
        //};
    },
    update: function() {
        //console.log("Entering the update to check if " + !!this.char + " is set");
        var that = this;
        //see if the character exists, and if not, see if it is set
        if (!this.char) {
            //console.log("Inside setting the char");
            var ownPlayer = ClientServices.ClientCharacterService.getOwnPlayerCharacter();
            //console.log("Result from ownPlayer:");
            //console.log(ownPlayer);
            if (ownPlayer) {
                this.char = PT.Character(ownPlayer.x, ownPlayer.y);
                var tileX, tileY, currentTiles;
                PT.game.input.mouse.onMouseDown = function(e) {
                    tileX = that.layer.getTileX(e.layerX);
                    tileY = that.layer.getTileY(e.layerY);
                    currentTiles = that.char.getCurrentTileLocation();
                    ClientServices.WalkingService.clickMap(that.char, tileX, tileY);
                };
            }
        }

        //if (this.cursors.left.isDown) {
        //    this.char.left();
        //} else if (this.cursors.right.isDown) {
        //    this.char.right();
        //} else if (this.cursors.up.isDown) {
        //    this.char.up();
        //} else if (this.cursors.down.isDown) {
        //    this.char.down();
        //} else {
        //    this.char.stop();
        //}
    }
};