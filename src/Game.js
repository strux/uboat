FOV = function (game, x, y, ctx3D) {

    this.game = game;
    this.ctx3D = ctx3D;

    this.radians = Phaser.Math.degToRad(40);

    Phaser.Sprite.call(this, this.game, x, y);

    this.leftEdge = new Phaser.Line(this.game.width/2, this.game.height, 200, this.game.height/2);
    this.rightEdge = new Phaser.Line(this.game.width/2, this.game.height, this.game.width - 200, this.game.height/2);

    this.game.physics.p2.enable(this, true);
    this.body.static = true;
    this.body.clearShapes();
    this.body.addPolygon({}, [[this.game.width/2, this.game.height], [200, this.game.height/2], [this.game.width - 200, this.game.height/2]]);
    this.body.data.shapes[0].sensor = true;

    this.body.onBeginContact.add(function(body, shape1, shape2) {

        var sprite2D = body.sprite;

        var sprite3D = this.ctx3D.create(0, 155, 'ship');
        sprite3D.smoothed = false;
        sprite3D.anchor.setTo(0.5, 1);
        sprite2D.ref3D = sprite3D;
        sprite3D.ref2D = sprite2D;
    }, this);

    this.body.onEndContact.add(function(body, shape1, shape2) {

        var sprite2D = body.sprite;
        // this.ctx3D.remove(body.sprite.ref3D);
        sprite2D.ref3D.destroy();
    }, this);

    this.game.add.existing(this);
};

FOV.prototype = Object.create(Phaser.Sprite.prototype);
FOV.prototype.constructor = FOV;

FOV.prototype.update = function() {

    this.ctx3D.children.forEach(function(sprite) {

        var pl = this.leftEdge.intersects(sprite.ref2D.fovOffsetGuide, true),
            pr = this.rightEdge.intersects(sprite.ref2D.fovOffsetGuide, true),
            fovWidth = pr.x - pl.x,
            fovX = sprite.ref2D.x - pl.x,
            distance = Phaser.Point.distance(this.leftEdge.start, sprite.ref2D),
            scale = (Math.pow((distance)/320, -1.6)) - 1,
            renderedX = this.game.width * fovX / fovWidth;

        sprite.x = renderedX;
        sprite.y = 160 + (Math.pow((distance)/320*1.6, -2))
        sprite.scale.setTo(scale, scale);
    }, this);
};


Vessel = function (game, x, y) {

    this.game = game;

    Phaser.Sprite.call(this, this.game, x, y, 'ocean');

    this.game.physics.p2.enable(this);
    this.body.damping = 0.999999;

    this.fovOffsetGuide = new Phaser.Line(0, 0, this.game.width, 0);

    this.game.add.existing(this);
};

Vessel.prototype = Object.create(Phaser.Sprite.prototype);
Vessel.prototype.constructor = Vessel;

Vessel.prototype.update = function() {

    this.fovOffsetGuide.centerOn(this.x, this.y);
};


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
        cursors = this.game.input.keyboard.createCursorKeys();

        this.game.stage.backgroundColor = '#0072BC';
        sky = this.game.add.sprite(0, 0, 'sky');
        ctx2D = this.game.add.group();
        ctx3D = this.game.add.group();
        ctx3D = this.game.add.group();
        periscopeMask = this.game.add.sprite(0, 0, 'mask');

        fov = new FOV(this.game, 0, 0, ctx3D);
        vessel = new Vessel(this.game, 500, 500);
    },

    update: function () {

        if (cursors.left.isDown)
        {
            vessel.body.moveLeft(50);
        }
        if (cursors.right.isDown)
        {
            vessel.body.moveRight(50);
        }
        if (cursors.up.isDown)
        {
            vessel.body.moveForward(50);
        }
        if (cursors.down.isDown)
        {
            vessel.body.moveBackward(50);
        }
    },

    render: function() {

        this.game.debug.geom(vessel.fovOffsetGuide, 'rgb(0,255,0)');
        this.game.debug.geom(fov.leftEdge, 'rgb(255,0,0)');
        this.game.debug.geom(fov.rightEdge, 'rgb(255,0,0)');
        ctx3D.children.forEach(function(sprite) {
            this.game.debug.spriteInfo(sprite, 32, 32);
        }, this);
    }

};
