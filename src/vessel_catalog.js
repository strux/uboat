// All units normalized to meters, seconds, grams

Uboat.Catalog = function() {

    this.metersPerKnot = 1852;
    this.gramsPerTon = 907185;
    this.secondsPerHour = 60 * 60;

    return {

        typeIXB: {

            length: 76.5,
            width: 6.76,
            height: 9.6,

            combustion: {
                fuelCapacity: 165 * this.gramsPerTon, // 165 tons * 907185 = 149,685,525

                /* This number was reverse engineered from max range
                 * and engine specs found on various websites.
                 * Knowing the following:
                 * Fuel capacity to be 165 tons or 149,685,525g
                 * Range 12,000 nmi @ 10 knots
                 * Running time to be max range / speed
                 *   then: 12,000nmi/10kts = 1,200 hrs
                 * Wattage @ 10 knots to be ~55% of max wattage (10kts/18.2kts)
                 *   then: 3,200kW * 2 * 0.55 = 3,520kW
                 *
                 * Consumption:
                 * 3520kW * 1,200hr = 149,685,525g
                 * 3520kW/hr = 124,738g
                 * 1kW/hr = 35.436931818g
                 * 1kW/s = 0.009843592172g
                 * 1kW/s/engine = 0.004921796086g
                 *
                 * Need to normalize so can be plugged into function: x^2+0.15
                 * 0.15 is cost of engine idle then non-linear increase peaking
                 * efficiency at ~55%
                 * 0.004921796086 / .55 = 0.008948720156
                 */
                fuelPerKwSPerEngine: 0.008948720156,
                maxMetersPerSecond: 18.2 * this.metersPerKnot / this.secondsPerHour, // 18.2 knots

                /* Throttle positions:
                 * äuber kraft: power
                 * große fahrt: great ride
                 * halbe fahrt: half way
                 * langsam fahrt: slow ride
                 * kleine fahrt: small ride
                 */
                throttlePositions: [0, 0.10, 0.25, 0.55, 0.75, 1],

                fuelConsumption: function(kwPercentage, seconds) {
                    var maxKw = 3200*2,
                        currentKw = maxKw * (Math.pow(kwPercentage, 2) + 0.15),
                        fuelGPerKw = 0.011964581175184162, //0.008948720156,
                        fuelCapacity = 149685525;
                    console.log('fuelCapacity ', fuelCapacity);
                    console.log('seconds ', seconds);
                    console.log('currentKw ', currentKw);
                    console.log('fuel per kws ', fuelCapacity / seconds / currentKw / 2);

                    return fuelGPerKw  * currentKw * seconds;
                }
            },

            electric: {
                chargeTime: 6 * this.secondsPerHour,
                maxMetersPerSecond: 7.3 * this.metersPerKnot / this.secondsPerHour, // 7.3 knots
                range: {
                    '4kts': 64 * this.metersPerKnot, // @ 4kts
                }
            }
        }
    }

};
