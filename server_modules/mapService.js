var fs = require('fs');

var pathToMaps = './public/tilemaps';

var mapStore = {};

module.exports.loadMapsIntoMemory = function(cb) {
    //load all the json maps from public/tilemaps and store them in mapStore
    var mapCount = 0;
    fs.readdir(pathToMaps, function(err, files){
        if (err) {
            err.swMessage = "Error at loadMapsIntoMemory->readdir!"; cb(err);
        }
        var mapName, mapData, mapX, mapY, tempMapArray;
        for (var m = 0; m < files.length; m++) {
            mapName = files[m].split('.');
            fs.realpath(pathToMaps + "/" + files[0], null, function(err, path){
                if (err) {
                    err.swMessage = "Error at loadMapsIntoMemory->realpath!"; cb(err);
                }
                mapData = require(path);
                mapX = mapData.width;
                mapY = mapData.height;

                //create the array to hold the map data
                tempMapArray = new Array(mapY);
                for(var z = 0; z < tempMapArray.length; z++) {
                    tempMapArray[z] = new Array(mapX);
                }

                //parse the map data into 2D
                var tileCounter = 0;
                for (var y = 0; y < mapY; y++) {
                    for (var x = 0; x < mapX; x++) {
                        //TODO - in real application this will need to store maps in the database with what tiles are walkable
                        tempMapArray[y][x] = mapData.layers[0].data[tileCounter] === 193;
                        tileCounter++;
                    }
                }
                mapStore[mapName[0]] = {
                    name: mapName[0],
                    mapHeight: mapY,
                    mapWidth: mapX,
                    fullMap: mapData,
                    walkingMap: tempMapArray,
                    walkable: [193],
                    obstacle: [15]
                };
                mapCount++;

                console.log("Loaded " + mapName[0] + " map");
            });
        }
    });
};