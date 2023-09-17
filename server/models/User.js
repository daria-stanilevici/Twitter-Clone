const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: { 
    type: String, 
    default: "/images/profilePic.png" 
  },
});

module.exports = mongoose.model('User', userSchema);