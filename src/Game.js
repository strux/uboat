
BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {
    preload: function () {
        this.load.tilemap('level1', 'assets/tilemaps/map-large.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('gameTiles', 'assets/images/map-large.png');
        this.load.spritesheet('player', 'assets/images/spritesheet_small.png', 8, 32, 2);
    },

	create: function () {

        this.game.physics.startSystem(Phaser.Physics.P2JS);

        this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        this.game.scale.setUserScale(0.5,0.5);

        // enable crisp rendering
        this.game.renderer.renderSession.roundPixels = true;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

        this.map = this.game.add.tilemap('level1');

        // the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        this.map.addTilesetImage('map-large', 'gameTiles');

        // create layer
        this.backgroundlayer = this.map.createLayer('Tile Layer 1');
        this.backgroundlayer.resizeWorld();
        // this.landMasses = this.game.physics.p2.convertCollisionObjects(this.map, "Object Layer 1", true);

        this.player = this.game.add.sprite(200, 200, 'player');
        this.player.frame = 0;
        this.player.pivot.setTo(0.5);
        this.player.scale.setTo(4,4);
        this.player.smoothed = false;
        // this.player.animations.add('dive', [1,2], 10, false);

        this.game.physics.p2.enable(this.player);
        this.player.body.angle = 180;
        this.player.gear = 0;

        this.game.camera.follow(this.player); 

        this.game.physics.p2.setBoundsToWorld(true, true, true, true, false);

        this.cursors = this.game.input.keyboard.createCursorKeys();

        var player = this.player;
        this.game.input.keyboard.onDownCallback = function(event) {
            console.log(event);
            if (event.key === 'ArrowUp') {
                if (player.gear < 5) {
                    player.gear += 1;
                }
            }
            if (event.key === 'ArrowDown') {
                if (player.gear > -5) {
                    player.gear -= 1;
                }
            }
            if (event.code === 'KeyD') {
                player.frame = 1 - player.frame;
            }
            console.log("Current gear: ", player.gear);
        };
	},

	update: function () {

        var speed = Math.abs(this.player.gear * 10),
            turnSpeed = this.player.gear * 2;

        if (this.player.body.velocity.x !== 0 && this.player.body.velocity.y !== 0) {

            if (this.cursors.left.isDown)
            {
                this.player.body.rotateLeft(turnSpeed);
            }
            else if (this.cursors.right.isDown)
            {
                this.player.body.rotateRight(turnSpeed);
            }
            else
            {
                this.player.body.setZeroRotation();
            }

        }

        if (this.player.gear > 0) {
            this.player.body.moveForward(speed);
        }
        if (this.player.gear < 0) {
            this.player.body.moveBackward(speed);
        }
	},

	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	}

};
