
if (bowser.msie && bowser.version <= 9) {
    alert("You're browser is not compatible with this demo. Please update, preferably to Google Chrome.");
} else {
    PT.game.state.add('boot', bootState);
    PT.game.state.add('load', loadState);
    PT.game.state.add('main', mainState);


    PT.game.state.start('boot');
}