PT.Character = function() {

    //inherits from base
    var o = PT.MobileObject();
    var char = o.game.add.sprite(0, 0, 'character');
    //add animations
    char.animations.add('left', [3, 4, 5], 10, true);
    char.animations.add('right', [6, 7, 8], 10, true);
    char.animations.add('down', [0, 1, 2], 10, true);
    char.animations.add('up', [9, 10, 11], 10, true);

    //set the char object and other data
    o.setCharacterObject(char, 120, [10, 1, 4, 7]);

    //return the character
    return o;

};
