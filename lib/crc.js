"use strict";

/**
 * Module dependencies
 */
const crc = require("crc");

/**
 * This class calculates CRC
 */
class Crc {
  /**
   * Calculate CRC by using CRC16 Kermit algorithm for calculation
   *
   * @param {Buffer} buffer
   * @returns {int}
   */
  static calculate(buffer) {
    return crc.crc16kermit(buffer);
  }

  /**
   * Generate CRC16 as 4-character uppercase hex string
   *
   * @param {string | Buffer} input - Hex string or Buffer
   * @returns {string} - CRC as uppercase 4-char hex string (e.g. 'A897')
   */
  static generate(input) {
    let buffer;

    if (typeof input === "string") {
      input = input.replace(/\s+/g, "");
      if (input.length % 2 !== 0) {
        console.log("Hex string length must be even");
        return "";
      }
      buffer = Buffer.from(input, "hex");
    } else if (Buffer.isBuffer(input)) {
      buffer = input;
    } else {
      throw new Error("Input must be a hex string or Buffer");
    }

    const crcValue = Crc.calculate(buffer);
    return crcValue.toString(16).padStart(4, "0");
  }
}

/**
 * Expose class
 */
module.exports = Crc;
