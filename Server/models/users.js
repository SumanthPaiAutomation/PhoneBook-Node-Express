const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minlength:8,
    maxlength:28,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  
  phonenumber:{
    type: Number,
    unique: true,
    required:true,
    minlength:10,
    maxlength:10,

  },
  created: {
    type: Date,
    default: Date.now,
  },
 
});

userSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function(attempt, next) {
  try {
    return await bcrypt.compare(attempt, this.password);
  } catch (err) {
    return next(err);
  }
};

module.exports = mongoose.model('User', userSchema);
