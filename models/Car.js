const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema(
  {
    dateOfCreation: { type: Date, default: Date.now },
    inOut: { type: String },
    date: { type: Date },
    time: { type: String },
    company: { type: String, trim: true },
    tara: { type: Number },
    sign: { type: String, trim: true },
    driver: { type: String },
    ttn: { type: String, unique: true },
    brutto: { type: Number },
    netto: { type: Number },
  },
  { versionKey: false }
);

module.exports = Car = mongoose.model('car', CarSchema);
