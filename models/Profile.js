const mongoose = require('mongoose');

const ProfileScheema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = Profile = mongoose.model('profile', ProfileScheema);
