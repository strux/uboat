
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
