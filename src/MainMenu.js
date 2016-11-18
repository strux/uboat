
Uboat.MainMenu = function (game) {

    this.music = null;
    this.playButton = null;

};

Uboat.MainMenu.prototype = {

    create: function () {

        this.startGame();
    },

    update: function () {

        //  Do some nice funky main menu effect here

    },

    startGame: function (pointer) {

        this.state.start('Game');

    }

};
