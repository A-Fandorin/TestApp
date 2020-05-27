const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema(
  {
    company: { type: String, unique: true },
  },
  { versionKey: false }
);
module.exports = Company = mongoose.model('company', CompanySchema);
