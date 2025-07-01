"use strict";

/**
 * Module dependencies
 */
const Segment = require("../segment"),
  RecordExtended = require("../record");

/**
 * This class sets payload for command 14
 */
class Command_14 extends Segment {
  /**
   * Set payload
   */
  constructor() {
    super();

    /**
     * Set payload fields
     */

    this.fields = {
      //Port ID
      port_id: 1,
      //Reserved
      reserved: 2,
      //timestamp
      timestamp: 4,
      record: {},
    };

    this.fields.record = new RecordExtended();
  }
}

/**
 * Expose class
 */
module.exports = Command_14;
