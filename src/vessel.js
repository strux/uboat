
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

