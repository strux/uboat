
Uboat.Boot = function (game) {
};

Uboat.Boot.prototype = {

    init: function () {

    },

    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
    },

    create: function () {

        this.state.start('Preloader');

    },
};
