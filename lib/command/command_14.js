"use strict";

function convertASCIItoHex(asciiString) {
  let hex = "";
  let tempASCII, tempHex;
  asciiString.split("").map((i) => {
    tempASCII = i.charCodeAt(0);
    tempHex = tempASCII.toString(16);
    hex = hex + tempHex;
  });
  hex = hex.trim();
  return hex;
}
/**
 * Module dependencies
 */
const Command = require("../command"),
  Payload_14 = require("../payload/command_14"),
  Base = require("../base"),
  Crc8 = require("../crc8"),
  Iterator = require("../iterator");

/**
 * This class handles payload for command 14
 */
class Command_14 extends Command {
  /**
   * Set payload for command 14
   *
   * @param {Payload_14} payload
   */
  constructor() {
    //check if payload is truly a payload for command 14
    super(new Payload_14());
    // console.log(payload instanceof Payload_14)
    // if (!(payload instanceof Payload_14)) {
    //     throw new Error("Command_14 payload must be an instance of Payload_14");
    // }
  }

  /**
   * Execute command
   * Process buffer in order to extract the command's payload
   *
   * @param {Iterator} bufIt
   */
  execute(bufIt) {
    //get command payload fields
    const payloadFields = this.payload.fields;
    //get end of buffer or get size and minus off the crc byte size
    const bufEnd = bufIt.end - 2;

    if (bufIt.offset + payloadFields.timestamp > bufEnd) {
      throw new Error("Payload size is too small");
    }

    // * get timestamp
    this.data.timestamp = bufIt.readNext(payloadFields.timestamp);
    console.log("Timestamp: " + this.data.timestamp);

    // * get some weird data
    const data = bufIt.buffer;
    const dataChunk = data.slice(bufIt.offset, -2);
    const dataASCII = dataChunk.toString();
    const dataHexStr = convertASCIItoHex(dataASCII);
    console.log("Data Hex : ", dataHexStr);

    const record = payloadFields.record;
    const recordFields = record.fields;

    this.data.records = [];
    while (bufIt.offset < bufEnd) {
      //init new record
      const rec = {};
      for (let f in recordFields.data_frame) {
        rec[f] = bufIt.readNext(recordFields.data_frame[f]);
      }
      this.data.records.push(rec);
    }

    //set acknowledgement
    //const command114 = "000c72010000" + dataHexStr + "470e";
    const command114 = "007272010000" + dataHexStr + "470e";
    //const command114 = "00047201000039ef";

    // const command114 = "00727201000055fffda1111250405ffffd55fffda112124e405ffffd55fffda113124e405ffffd55fffda114124e405ffffd55fffda115124f405ffffd55fffda116124e4060fffd55fffda117124d405ffffd55fffda118124d4060fffd55fffda119124e4060fffd55fffda11a124f405efffd470e";
    console.log("Command 114 : ", command114);
    this.ack = Buffer.from(command114, "hex");
  }
}

/**
 * Expose class
 */
module.exports = Command_14;
