
Uboat.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game
    this.add;       //  used to add sprites, text, groups, etc
    this.camera;    //  a reference to the game camera
    this.cache;     //  the game cache
    this.input;     //  the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;      //  for preloading assets
    this.math;      //  lots of useful common math operations
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc
    this.stage;     //  the game stage
    this.time;      //  the clock
    this.tweens;    //  the tween manager
    this.world;     //  the game world
    this.particles; //  the particle manager
    this.physics;   //  the physics manager
    this.rnd;       //  the repeatable random number generator

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

Uboat.Game.prototype = {
    preload: function () {
        this.game.load.image('ocean', 'assets/images/ocean-tile.png', 32, 32);
        this.game.load.image('mask', 'assets/images/periscope-mask.png', 32, 32);
        this.game.load.image('sky', 'assets/images/sky.png', 32, 32);
        this.game.load.image('ship', 'assets/images/ship.png', 32, 32);
    },

    create: function () {

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.game.stage.backgroundColor = '#0072BC';
        this.sky = this.game.add.sprite(0, 0, 'sky');
        this.ctx2D = this.game.add.group();
        this.ctx3D = this.game.add.group();
        this.periscopeMask = this.game.add.sprite(0, 0, 'mask');

        this.fov = new FOV(this.game, 0, 0, this.ctx3D);
        this.vessel = new Vessel(this.game, 500, 500);
    },

    update: function () {

        if (this.cursors.left.isDown)
        {
            this.vessel.body.moveLeft(50);
        }
        if (this.cursors.right.isDown)
        {
            this.vessel.body.moveRight(50);
        }
        if (this.cursors.up.isDown)
        {
            this.vessel.body.moveForward(50);
        }
        if (this.cursors.down.isDown)
        {
            this.vessel.body.moveBackward(50);
        }
    },

    render: function() {

        this.game.debug.geom(this.vessel.fovOffsetGuide, 'rgb(0,255,0)');
        this.game.debug.geom(this.fov.leftEdge, 'rgb(255,0,0)');
        this.game.debug.geom(this.fov.rightEdge, 'rgb(255,0,0)');
        /*
        this.ctx3D.children.forEach(function(sprite) {
            this.game.debug.spriteInfo(sprite, 32, 32);
        }, this);
        */
    }

};
