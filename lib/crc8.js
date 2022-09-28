'use strict';

/**
 * Module dependencies
 */
const crc8 = require('crc');

/**
 * This class calculates CRC
 */
class Crc8 {

    /**
     * Calculate CRC by using CRC16 Kermit algorithm for calculation
     * 
     * @param {Buffer} buffer
     * @returns {int}
     */
    static calculate(buffer) {
        return crc8.crc8(buffer);
    }

}

/**
 * Expose class
 */
module.exports = Crc8;