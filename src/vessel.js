
Vessel = function (game, x, y, vesselProperties) {

    this.game = game;

    Phaser.Sprite.call(this, this.game, x, y, 'ocean');

    this.fuelCapacity = this.fuelLevel = vesselProperties.combustion.fuelTons * Uboat.Constants.gramsPerTon;
    this.maxSpeed = vesselProperties.combustion.maxKnots * Uboat.Constants.metersPerKnot / Uboat.Constants.secondsPerHour;
    this.width = vesselProperties.width * Uboat.Constants.metersPerPixel;

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

Vessel.prototype._dieselFuelEconomy = function(kwPercentage) {

    // Simple exponential function to translate throttle positions (engine output %) into fuel economy percentages
    // http://fooplot.com/#W3sidHlwZSI6MCwiZXEiOiJ4XjIrMC4xNSIsImNvbG9yIjoiIzE3OTk0RiJ9LHsidHlwZSI6MCwiZXEiOiIteCsxIiwiY29sb3IiOiIjQ0NDQ0NDIn0seyJ0eXBlIjoxMDAwLCJ3aW5kb3ciOlsiMCIsIjEiLCIwIiwiMSJdLCJncmlkIjpbIiIsIi4wNSJdLCJzaXplIjpbNTAwLDUwMF19XQ--
    return (Math.pow(kwPercentage, 2) + 0.15)
};

Vessel.prototype._fuelConsumption = function(engineOutput, seconds) {
    var fuelEconomy = this._dieselFuelEconomy(engineOutput);

    return fuelEconomy * fuelEconomy * seconds;
};
