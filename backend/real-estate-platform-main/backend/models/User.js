const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  image: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  address: {
    type: String,
  },
  landlineNumber: {
    type: String,
  },
});
const User = mongoose.model("User", Userschema);

module.exports = User;
