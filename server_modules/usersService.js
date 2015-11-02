/**
 * Private variables
 */

var usersList = {};

/**
 * Public interface
 */

module.exports.addNewUser = function(name, id) {
    usersList[name] = {
        name: name,
        id: id
    };
};

module.exports.getUser = function(name) {
    for(var usr in usersList) {
        if (usr === name) {
            return usersList[usr];
        }
    }
    return null;
};

module.exports.getNameById = function(id) {
    for(var user in usersList) {
        if (usersList[user].id === id) {
            return usersList[user].name;
        }
    }
    return null;
};

module.exports.getAllUsers = function() {
    //clone the object to prevent losing encapsulation
    return JSON.parse(JSON.stringify(usersList));
};
