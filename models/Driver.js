const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema(
  {
    driverId: { type: String, unique: true },
  },
  { versionKey: false }
);
module.exports = Driver = mongoose.model('driver', DriverSchema);
