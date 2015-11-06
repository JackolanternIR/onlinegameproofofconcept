var ClientServices = ClientServices || {};

/**
 * A function that is used for click-to-move tile-based movement. Encapsulates Pathfinding library.
 * @constructor
 */
ClientServices.WalkingService = function() {
    //private members
    var currentGrid;

    //return public interface
    return {
        /**
         * The method to create the PF grid
         * @param inLayer The layer of the map to create the grid from
         * @param tileX The width of the tiles used
         * @param tileY The height of the tiles used
         */
        createGrid: function(inLayer, tileX, tileY) {
            var width = inLayer.width / tileX;
            var height = inLayer.height / tileY;
            currentGrid = new PF.Grid(width, height);
        },

        setWalkable: function(x, y, walkable) {
            currentGrid.setWalkableAt(x, y, walkable);
        },

        viewGrid: function() {
            console.log("The PF Grid:");
            console.log(currentGrid);
        },

        isWalkable: function(x, y) {
            return currentGrid.nodes[y][x].walkable;
        }
    };
};

ClientServices.WalkingService = ClientServices.WalkingService();