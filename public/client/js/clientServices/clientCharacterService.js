var ClientServices = ClientServices || {};

ClientServices.ClientCharacterService = function() {
    //private variables
    var ownPlayerCharacter = {};
    var otherPlayerCharacter = {};

    //public interface
    return {
        setOwnPlayerCharacter: function(x, y, name) {
            ownPlayerCharacter = {
                name: name,
                x: x,
                y: y
            }
        },
        setOtherPlayerCharacter: function(x, y, name) {
            otherPlayerCharacter[name] = {
                name: name,
                x: x,
                y: y
            }
        },
        getOwnPlayerCharacter: function() {
            if (ownPlayerCharacter.name) {
                return ownPlayerCharacter;
            }
            return null;
        },
        getOtherPlayerCharacter: function(name) {
            for(var char in otherPlayerCharacter) {
                if (char.name === name) {
                    return otherPlayerCharacter[char];
                }
            }
            return null;
        }
    };
};

ClientServices.ClientCharacterService = ClientServices.ClientCharacterService();
