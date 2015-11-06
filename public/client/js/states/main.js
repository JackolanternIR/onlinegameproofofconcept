var mainState = {
    preload: function() { },
    create: function() {

        var that = this;

        //create the cursors for keyboard movement
        this.cursors = PT.game.input.keyboard.createCursorKeys();

        //create the tilemap
        this.map = PT.game.add.tilemap('samplemap');
        this.map.addTilesetImage('ground');
        this.map.addTilesetImage('grass');
        this.layer = this.map.createLayer('Tile Layer 1');
        var tileset = this.layer.getTiles(0, 0, 1024, 800);
        this.tileKey = ClientServices.TileKeyService(this.map, this.layer, 32, 32, 193, 15, ClientServices.WalkingService);

        //create the character
        this.char = PT.Character();

        //create the walkingService
        //this.walkingService

        //create the mouseDown event
        var tileX, tileY;
        PT.game.input.mouse.onMouseDown = function(e) {
            tileX = that.layer.getTileX(e.layerX);
            tileY = that.layer.getTileY(e.layerY);
            console.log("X: " + tileX + ", Y: " + tileY + ", Type: " + ClientServices.WalkingService.isWalkable(tileX, tileY));
        };
    },
    update: function() {

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