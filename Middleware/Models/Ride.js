const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  driverId: { type: mongoose.Schema.Types.ObjectId, default: null },
  pickup: String,
  drop: String,
  distance: Number,
  fare: Number,
  status: {
    type: String,
    enum: ["pending", "accepted", "completed"],
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Ride", rideSchema);