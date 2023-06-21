"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var otpSchema = new _mongoose.Schema({
  phoneNumber: {
    type: Number,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    "default": Date.now,
    index: {
      expires: 300
    }
  } //after 5 min it will get deleted automatically from databse

}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Otp', otpSchema); //User table name


exports["default"] = _default;