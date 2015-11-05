var ClientServices = ClientServices || {};

/**
 * A function to create a programmatic 2D array of ground tiles for movement and other usage
 * @param inTileMap The tilemap to base the tile key on
 * @param inGroundLayer The layer to use for the tile key
 * @param tileSizeX The height of the tiles used in the map
 * @param tileSizeY The width of the tiles used in the map
 * @param movableIndex The index used for tiles that can be moved onto
 * @param obstacleIndex The index used for tiles that cannot be moved on or through
 * @constructor
 */
ClientServices.TileKeyService = function(inTileMap, inGroundLayer, tileSizeX, tileSizeY, movableIndex, obstacleIndex) {

    //get the tiles from the layer sent in
    var allTiles = inGroundLayer.getTiles(0, 0, inTileMap.widthInPixels, inTileMap.heightInPixels);

    //fill a 2D array the size of the map ahead of time to prevent JS multidimensional array undefined errors
    var tileKey = new Array(inTileMap.height);
    for (var y = 0; y < inTileMap.width; y++) {
        tileKey[y] = new Array(inTileMap.height);
    }

    //parse the map
    for (var x = 0; x < allTiles.length; x++) {
        tileKey[allTiles[x].worldX / tileSizeX][allTiles[x].worldY / tileSizeY] = allTiles[x].index === movableIndex ? 'movable' : 'obstacle';
    }

    //return the tilekey
    return tileKey;
};
