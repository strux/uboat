Uboat = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,

    /* Your game can check Uboat.orientated in internal loops to know if it should pause or not */
    orientated: false

};

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
