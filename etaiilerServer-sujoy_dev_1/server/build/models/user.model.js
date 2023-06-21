"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var userSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  dateOfBirth: {
    type: String
  },
  state: {
    type: String
  },
  city: {
    type: String
  },
  pincode: {
    type: Number
  },
  gender: {
    type: String
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  role: {
    type: String
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('User', userSchema); //User table name


exports["default"] = _default;