// All units normalized to meters, seconds, grams

Uboat.Catalog = {

    typeIXB: {

        length: 76.5,
        width: 6.76,
        height: 9.6,

        combustion: {
            fuelTons: 165,

            /* This number was reverse engineered from max range
             * and engine specs found on various websites.
             * Knowing the following:
             * Fuel capacity to be 165 tons or 149,685,525g
             * Range 12,000 nmi @ 10 knots
             * Running time to be max range / speed
             *   then: 12,000nmi/10kts = 1,200 hrs
             * We'll estimate 10 knots to be 45.25% of max power (dieselFuelEconomy(10kts/18.2kts))
             *
             * To get consumption we'll solve for it:
             * If fuelCapacity = engineOutput * seconds * fuelConsumption * numEngines
             * then fuelConsumption = fuelCapacity / engineOutput / seconds / numEngines
             *
             *  38.2866597606 = 149,685,525 / 0.4525 / 4,320,000 / 2
             *
             * Consumption:
             * 1%/s/engine = 38.2866597606 grams
             *
             */
            fuelPerSecond: 38.2866597606,
            maxKnots: 18.2, // 18.2 knots

            /* Throttle positions:
             * äuber kraft: power
             * große fahrt: great ride
             * halbe fahrt: half way
             * langsam fahrt: slow ride
             * kleine fahrt: small ride
             *
             * -1 = off,
             * 0  = idle,
             * >0 = engine output %
             */
            throttlePositions: [-1, 0, 0.10, 0.25, 0.55, 0.75, 1],
            engines: {
                port: -1,
                starboard: -1,
            },

        },

        electric: {
            chargeTime: 6 * Uboat.Constants.secondsPerHour,
            maxMetersPerSecond: 7.3 * Uboat.Constants.metersPerKnot / Uboat.Constants.secondsPerHour, // 7.3 knots
            range: {
                '4kts': 64 * Uboat.Constants.metersPerKnot, // @ 4kts
            }
        }
    }

};
