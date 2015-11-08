var ClientServices = ClientServices || {};

/**
 * A function to create a programmatic 2D array of ground tiles for movement and other usage
 * @param inTileMap The tilemap to base the tile key on
 * @param inGroundLayer The layer to use for the tile key
 * @param tileSizeX The height of the tiles used in the map
 * @param tileSizeY The width of the tiles used in the map
 * @param movableIndex The index used for tiles that can be moved onto
 * @param obstacleIndex The index used for tiles that cannot be moved on or through
 * @param walkingService The service that handles the click-to-move movement
 * @constructor
 */
ClientServices.TileKeyService = function(inTileMap, inGroundLayer, tileSizeX, tileSizeY, movableIndex, obstacleIndex, walkingService) {

    //get the tiles from the layer sent in
    var allTiles = inGroundLayer.getTiles(0, 0, inTileMap.widthInPixels, inTileMap.heightInPixels);

    //create the grid in the walking service
    walkingService.createGrid(inGroundLayer, tileSizeX, tileSizeY);

    //parse the map
    for (var x = 0; x < allTiles.length; x++) {
        walkingService.setWalkable(allTiles[x].worldX / tileSizeX, allTiles[x].worldY / tileSizeY, allTiles[x].index === movableIndex);
    }

    //walkingService.viewGrid();
};
