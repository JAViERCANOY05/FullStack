const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const RoomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Room Name "],
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room",RoomSchema);
module.exports = Room ;