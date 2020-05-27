const mongoose = require('mongoose');

const AutoSchema = new mongoose.Schema(
  {
    auto: { type: String },
    autosign: { type: String, unique: true, trim: true },
    trailer: { type: String },
    trailersign: { type: String },
  },
  { versionKey: false }
);
module.exports = Auto = mongoose.model('auto', AutoSchema);
