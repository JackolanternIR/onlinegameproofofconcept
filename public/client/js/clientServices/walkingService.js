var ClientServices = ClientServices || {};

/**
 * A function that is used for click-to-move tile-based movement. Encapsulates Pathfinding library.
 * @constructor
 */
ClientServices.WalkingService = function() {
    //private members
    var currentGrid;
    var tempGrid;
    var finder;

    //create the A* pathfinder object on service creation
    finder = new PF.AStarFinder({
        allowDiagonal: false,
        dontCrossCorners: true,
        heuristic: PF.Heuristic.manhattan
    });

    //return public interface
    return {
        /**
         * Create the PF grid on map loading
         * @param inLayer The layer of the map to create the grid from
         * @param tileX The width of the tiles used
         * @param tileY The height of the tiles used
         */
        createGrid: function(inLayer, tileX, tileY) {
            var width = inLayer.width / tileX;
            var height = inLayer.height / tileY;
            currentGrid = new PF.Grid(width, height);
        },

        /**
         * A wrapper for Pathfinding's setWalkableAt function
         * @param x The X coordinate of the tile (tile coordinates, not pixel)
         * @param y The Y coordinate of the tile (tile coordinates, not pixel)
         * @param walkable A boolean that determines if the player can walk onto this tile
         */
        setWalkable: function(x, y, walkable) {
            currentGrid.setWalkableAt(x, y, walkable);
        },

        /**
         * Testing function used to log the grid to the console
         */
        viewGrid: function() {
            console.log("The PF Grid:");
            console.log(currentGrid);
        },

        /**
         * Determines if the passed in tile is walkable
         * @param x The X coordinate of the tile (tile coordinates, not pixel)
         * @param y The Y coordinate of the tile (tile coordinates, not pixel)
         * @returns {boolean|*|i|r}
         */
        isWalkable: function(x, y) {
            return currentGrid.nodes[y][x].walkable;
        },

        /**
         * Handles clicks on the map
         * @param char The character moving
         * @param x2 The X coordinate of the target tile (tile coordinates, not pixel)
         * @param y2 The Y coordinate of the target tile (tile coordinates, not pixel)
         */
        clickMap: function(char, x2, y2) {
            if (this.isWalkable(x2, y2)) {
                //create a clone of the grid since process is destructive
                tempGrid = Object.clone(currentGrid, true);
                var tilePoint = char.getCurrentTileLocation();
                var path = finder.findPath(tilePoint.x, tilePoint.y, x2, y2, tempGrid);
                char.setMovementPath(path);
            } else {
                console.log("Tile (" + x2 + ", " + y2 +") is not a walkable tile.");
            }
        }
    };
};

ClientServices.WalkingService = ClientServices.WalkingService();